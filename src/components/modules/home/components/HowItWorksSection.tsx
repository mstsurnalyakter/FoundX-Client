"use client"
import { Container } from '@/src/components/UI/Container';
import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import { Camera, Search, MessageCircle, HandHeart } from 'lucide-react';
import Link from 'next/link';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Camera className="w-16 h-16 text-white" />,
      title: "Post or Search",
      description: "Found something? Take a photo and post details. Lost something? Search our database.",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      icon: <Search className="w-16 h-16 text-white" />,
      title: "Get Matched",
      description: "Our smart algorithm matches found items with lost item reports automatically.",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      icon: <MessageCircle className="w-16 h-16 text-white" />,
      title: "Connect Safely",
      description: "Communicate through our secure messaging system to verify ownership.",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      icon: <HandHeart className="w-16 h-16 text-white" />,
      title: "Happy Reunion",
      description: "Arrange a safe meetup and witness the joy of reuniting people with their belongings.",
      color: "bg-gradient-to-r from-red-500 to-red-600"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-default-50 to-default-100 py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">How FoundX Works</h2>
          <p className="text-xl text-default-600 max-w-3xl mx-auto">
            Simple steps to reunite lost items with their owners
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center space-y-6"
            >
              <div className={`w-32 h-32 ${step.color} rounded-full flex items-center justify-center mx-auto shadow-lg`}>
                {step.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-default-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-default-300 transform -translate-y-1/2"></div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/profile/create-post">
            <Button color="primary" size="lg" className="font-semibold">
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
};

export default HowItWorksSection;