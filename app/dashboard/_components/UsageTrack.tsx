"use client";
import React, { useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { aiOuput } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '../credits/TotalUsageContext';  // Corrected path
import { UpdateCreditUsageContext } from '../credits/UpdateCreditsUsageContext';

const UsageTrack = () => {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);  // Destructure correctly

  useEffect(() => {
    if (user) {
      GetData();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      GetData();
    }
  }, [updateCreditUsage]);  // Trigger data fetch when updateCreditUsage changes

  const GetData = async () => {
    try {
      const result: HISTORY[] = await db
        .select()
        .from(aiOuput)
        .where(eq(aiOuput.createdBy, user?.primaryEmailAddress?.emailAddress));

      GetTotalUsage(result);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const GetTotalUsage = (result: HISTORY[]) => {
    let total = 0;
    result.forEach((element) => {
      if (element.aiResponse && typeof element.aiResponse === 'string') {
        total += element.aiResponse.length;
      }
    });
    setTotalUsage(total);
  };

  return (
    <div className='m-5'>
      <div className='bg-[#592564] text-white p-3 rounded-lg'>
        <h2 className='font-medium'>Credits</h2>
        <div className='h-2 bg-[#b85eca] w-full rounded-full mt-3'>
          <div
            className='h-2 bg-white rounded-full'
            style={{
              width: `${Math.min((totalUsage / 100000000) * 100, 100)}%`,
            }}
          ></div>
        </div>
        <h2 className='text-sm my-2'>{isNaN(totalUsage) ? '0' : totalUsage}/100,000,000 Credits Used</h2>
      </div>
      <Button variant={'secondary'} className='text-[#592564] w-full my-3'>
        Upgrade
      </Button>
    </div>
  );
};

export default UsageTrack;
