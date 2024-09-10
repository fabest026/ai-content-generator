"use client"
import { Textarea } from '@/components/ui/textarea';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';

interface PROPS {
    selectedTemplate?: TEMPLATE;
    userFormInput: any,
    loading: boolean
}

const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
    const [formData, setFormData] = useState<any>({}); // Corrected useState initialization

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        userFormInput(formData);
    };

    return (
        <div className='p-5 shadow-md border rounded-lg bg-white'>
            {/* @ts-ignore */}
            <Image src={selectedTemplate?.icon} width={70} height={70} alt="icon" />
            <h2 className='font-bold text-2xl mb-2 text-[#592564]'>{selectedTemplate?.name}</h2>
            <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>
            <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
                        <label className='font-bold'>{item.label}</label>
                        {item.field === 'input' ? (
                            <input
                                name={item.name}
                                required={item?.required}
                                onChange={handleInputChange}
                                type="text"
                                className="border p-2 rounded"
                            />
                        ) : item.field === 'textarea' ? (
                            <Textarea
                                name={item.name}
                                required={item?.required}
                                onChange={handleInputChange}
                                className="border p-2 rounded"
                            />
                        ) : null}
                    </div>
                ))}
                <Button type='submit' 
                className='bg-[#592564] hover:bg-[#853296] 
                w-full py-6'
                disabled={loading}>
                    {loading&&<Loader2Icon className='animate-spin mr-2'/>}
                    Generate</Button>
            </form>
        </div>
    );
};

export default FormSection;
