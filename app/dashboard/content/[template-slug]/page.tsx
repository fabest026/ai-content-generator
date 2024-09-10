"use client"
import React, { useContext, useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import Templates from '@/app/(data)/Templates';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModel';
import { db } from '@/utils/db'; // Ensure Drizzle DB is correctly imported
import { aiOuput } from '@/utils/schema'; // Ensure schema is correctly imported
import { useUser } from '@clerk/clerk-react'; // Clerk authentication hook
import moment from 'moment'; // For date formatting
import { TotalUsageContext } from '../../credits/TotalUsageContext';
import { useRouter } from 'next/navigation';
import { UpdateCreditUsageContext } from '../../credits/UpdateCreditsUsageContext';

interface PROPS {
    params: {
        'template-slug': string
    }
}

const CreateNewContent = (props: PROPS) => {
    const selectedTemplate = Templates?.find((item) => item.slug === props.params['template-slug']);
    const [loading, setLoading] = useState(false);
    const [aiOuputText, setAiOuput] = useState<string>('');
    const { user } = useUser(); // Clerk user authentication
    const router = useRouter();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

    const GenerateAIContent = async (formData: any) => {
        if (totalUsage >= 100000000) {
            console.log("Please Upgrade");
            router.push('/dashboard/billing');
            return;
        }

        try {
            console.log('Form Data:', formData);

            if (!formData || Object.keys(formData).length === 0) {
                console.error('Form data is undefined or empty.');
                return;
            }

            setLoading(true);

            const selectedPrompt = selectedTemplate?.aiPrompt;
            if (!selectedPrompt) {
                console.error('No prompt found for the selected template.');
                setLoading(false);
                return;
            }

            const FinalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
            console.log('Final AI Prompt:', FinalAIPrompt);

            const result = await chatSession.sendMessage(FinalAIPrompt);
            const aiResponseText = result?.response?.text() ?? '';
            console.log('AI Response:', aiResponseText);

            setAiOuput(aiResponseText);

            // Save to the database
            await SaveInDb(formData, selectedTemplate?.slug, aiResponseText);

            // Update credit usage after AI response
            setUpdateCreditUsage(Date.now());  // Triggers useEffect in UsageTrack to refresh
            setTotalUsage(totalUsage + aiResponseText.length);  // Increment the total usage count

            setLoading(false);
        } catch (error) {
            console.error('Error in GenerateAIContent:', error);
            setLoading(false);

            // Ensure state changes in case of error
            setUpdateCreditUsage(Date.now());
        }
    };

    const SaveInDb = async (formData: any, slug: string, aiResp: string) => {
        try {
            const serializedFormData = JSON.stringify(formData);

            console.log('Saving to DB:', { formData: serializedFormData, slug, aiResp });

            const result = await db.insert(aiOuput).values({
                formData: serializedFormData, // Insert serialized form data
                templateSlug: slug,
                aiResponse: aiResp,
                createdBy: user?.primaryEmailAddress?.emailAddress ?? 'Unknown', // Safeguard for user
                createdAt: moment().format('DD/MM/yyyy') // Format date for DB insertion
            });

            console.log('Insert result:', result); // Log insert result
        } catch (error) {
            console.error('Error inserting into DB:', error);
        }
    };

    return (
        <div className='p-10'>
            <Link href={'/dashboard'}>
                <Button className='bg-[#592564] hover:bg-[#853296]'>
                    <ArrowLeft />
                    Back
                </Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
                {/* FormSection */}
                <FormSection
                    selectedTemplate={selectedTemplate}
                    userFormInput={(v: any) => GenerateAIContent(v)}  // Pass form data
                    loading={loading}
                />

                {/* OutputSection */}
                <div className='col-span-2'>
                    <OutputSection aiOuput={aiOuputText} />
                </div>
            </div>
        </div>
    );
};

export default CreateNewContent;
