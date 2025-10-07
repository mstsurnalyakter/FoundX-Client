"use client"
import { Container } from '@/src/components/UI/Container'
import { Card, CardBody } from '@heroui/card'
import { Input, Textarea } from '@heroui/input'
import { Button } from '@heroui/button'
import { Select, SelectItem } from '@heroui/select'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<ContactFormData>()

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true)
    
    try {
      console.log('Submitting contact form:', data)
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        reset()
        toast.success('Message sent successfully! Check your email for confirmation.')
        
        setTimeout(() => {
          setIsSubmitted(false)
        }, 8000)
      } else {
        console.error('Error response:', responseData)
        toast.error(responseData.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Network error:', error)
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <div className="py-12 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Get in Touch</h1>
          <p className="text-xl text-default-600 max-w-2xl mx-auto">
            Have questions? We're here to help you reunite with your belongings.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-6 ">
            <CardBody className="space-y-14 flex flex-col items-center justify-center">
              <div className="flex items-center gap-8">
                <h2 className="text-2xl font-semibold">Send us a message</h2>
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="text-green-500"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Info Alert */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-blue-700 font-medium">Email Notifications Enabled</p>
                  <p className="text-blue-600">You'll receive a confirmation email after submitting this form.</p>
                </div>
              </motion.div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      {...register('firstName', { required: 'First name is required' })}
                      label="First Name"
                      placeholder="John"
                      isInvalid={!!errors.firstName}
                      errorMessage={errors.firstName?.message}
                    />
                  </div>
                  <div>
                    <Input
                      {...register('lastName', { required: 'Last name is required' })}
                      label="Last Name"
                      placeholder="Doe"
                      isInvalid={!!errors.lastName}
                      errorMessage={errors.lastName?.message}
                    />
                  </div>
                </div>
                
                <Input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  label="Email"
                  placeholder="john@example.com"
                  type="email"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />
                
                <Controller
                  name="subject"
                  control={control}
                  rules={{ required: 'Please select a subject' }}
                  render={({ field }) => (
                    <Select
                      label="Subject"
                      placeholder="Choose a subject"
                      isInvalid={!!errors.subject}
                      errorMessage={errors.subject?.message}
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        field.onChange(selectedKey);
                      }}
                    >
                      <SelectItem key="general">General Inquiry</SelectItem>
                      <SelectItem key="technical">Technical Support</SelectItem>
                      <SelectItem key="report">Report an Issue</SelectItem>
                      <SelectItem key="partnership">Partnership</SelectItem>
                      <SelectItem key="feedback">Feedback</SelectItem>
                    </Select>
                  )}
                />
                
                <Textarea
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters'
                    }
                  })}
                  label="Message"
                  placeholder="How can we help you?"
                  minRows={4}
                  isInvalid={!!errors.message}
                  errorMessage={errors.message?.message}
                />
                
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                  startContent={!isSubmitting && <Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>

              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-green-50 border border-green-200 rounded-lg text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-green-800 font-semibold text-lg mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700 mb-2">Thank you for contacting FoundX!</p>
                  <div className="text-green-600 text-sm space-y-1">
                    <p>✅ Your message has been delivered</p>
                    <p>📧 Confirmation email sent to your inbox</p>
                    <p>⏰ We'll respond within 24 hours</p>
                  </div>
                </motion.div>
              )}
            </CardBody>
          </Card>

          {/* Contact Info - Keep all your existing contact cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardBody className="flex items-center space-x-4">
                  <Mail className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="text-default-600">factoryapp32@gmail.com</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardBody className="flex items-center space-x-4">
                  <Phone className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="text-default-600">+1 (555) 123-4567</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardBody className="flex items-center space-x-4">
                  <MapPin className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="text-default-600">123 Found Street, City, State</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardBody className="flex items-center space-x-4">
                  <Clock className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-default-600">Mon-Fri: 9AM-6PM</p>
                    <p className="text-default-600 text-sm">Weekend: 10AM-4PM</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Quick Help Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardBody>
                  <h3 className="font-semibold mb-3">Quick Help</h3>
                  <div className="space-y-2 text-sm">
                    <p>• Lost item? Check our <span className="text-primary font-medium">Found Items</span> page first</p>
                    <p>• Found something? <span className="text-primary font-medium">Post it</span> to help the owner</p>
                    <p>• Technical issues? Our support team responds within 24 hours</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Contact