import { useAddFeedbackToClaimRequst } from '@/src/hooks/claimRequest.hook'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form';
import FXModal from './FXModal';
import FXTextArea from '../form/FXTextArea';
import { Button } from '@heroui/button';
import FXForm from '../form/FXForm';



const FeedbackModal = ({ id }: { id: string }) => {
  const { mutate: handleFeedback, isPending } = useAddFeedbackToClaimRequst();
  const [status, setStatus] = useState("");
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const feedbackData = {
      id,
      data: {
        feedback: data?.feedback,
        status,
      }
    }
    console.log({ feedbackData })
    handleFeedback(feedbackData)
  }


  return (
    <FXModal buttonClassName="flex-1"
      buttonText="Feedback"
      title="Feedback">
      <FXForm onSubmit={onSubmit}>

        <FXTextArea label="Feedback" name="feedback" />

        <div className='flex justify-between items-center py-5'>
          <Button disabled={isPending} onClick={() => setStatus("APPROVED")} className={`disabled:cursor-not-allowed`} size="md" type="submit">
            Approved
          </Button>
          <Button disabled={isPending} onClick={() => setStatus("REJECTED")} className={`disabled:cursor-not-allowed`} size="md" type="submit">
            Reject
          </Button>
        </div>
      </FXForm>


    </FXModal>
  )
}

export default FeedbackModal