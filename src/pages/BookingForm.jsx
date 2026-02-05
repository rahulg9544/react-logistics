import { useEffect } from 'react'
import { useForm } from '@mantine/form'
import SectionWrapper from '../components/SectionWrapper'
import FormInput from '../components/FormInput'
import { notifications } from '@mantine/notifications'


export default function BookingForm() {
  const form = useForm({
    initialValues: {
      senderName: '',
      senderMobile: '',
      senderEmail: '',
      receiverName: '',
      receiverAddress: '',
      weight: '',
      rate: '',
      total: 0
    },

    validate: {
      senderName: value => (value ? null : 'Sender name required'),
      senderMobile: value =>
        /^\d{10}$/.test(value) ? null : 'Enter valid 10-digit mobile',
      senderEmail: value =>
        value && !/^\S+@\S+$/.test(value) ? 'Invalid email' : null,
      receiverName: value => (value ? null : 'Receiver name required'),
      receiverAddress: value => (value ? null : 'Address required'),
      weight: value => (value > 0 ? null : 'Weight must be greater than 0'),
      rate: value => (value ? null : 'Rate required')
    }
  })

  useEffect(() => {
    const total = Number(form.values.weight) * Number(form.values.rate)
    form.setFieldValue('total', total || 0)
  }, [form.values.weight, form.values.rate])

  const handleSubmit = values => {
  console.log('BOOKING DATA:', values)

  notifications.show({
    title: 'Success',
    message: 'Booking Successful',
    color: 'green'
  })
}


  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      {/* Sender & Receiver */}
      <div className="row">
        <div className="col-md-6">
          <SectionWrapper title="Sender Details">
            <FormInput label="Full Name" name="senderName" form={form} />
            <FormInput label="Mobile Number" name="senderMobile" form={form} />
            <FormInput label="Email" name="senderEmail" form={form} />
          </SectionWrapper>
        </div>

        <div className="col-md-6">
          <SectionWrapper title="Receiver Details">
            <FormInput label="Full Name" name="receiverName" form={form} />
            <FormInput
              label="Full Address"
              name="receiverAddress"
              form={form}
              textarea
            />
          </SectionWrapper>
        </div>
      </div>

      {/* Package */}
      <SectionWrapper title="Package Details">
        <div className="row">
          <div className="col-md-4">
            <FormInput
              label="Weight (kg)"
              type="number"
              name="weight"
              form={form}
            />
          </div>
          <div className="col-md-4">
            <FormInput
              label="Rate per kg (INR)"
              type="number"
              name="rate"
              form={form}
            />
          </div>
          <div className="col-md-4">
            <FormInput
              label="Total Shipping Cost"
              name="total"
              form={form}
              readOnly
            />
          </div>
        </div>
      </SectionWrapper>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={!form.isValid()}
      >
        Submit Booking
      </button>
    </form>
  )
}
