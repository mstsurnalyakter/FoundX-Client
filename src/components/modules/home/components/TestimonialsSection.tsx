"use client"
import { Container } from '@/src/components/UI/Container';
import { Card, CardBody } from '@heroui/card';
import { Avatar } from '@heroui/avatar';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Teacher",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      content: "I lost my wedding ring at the park and thought I'd never see it again. Thanks to FoundX, a kind stranger found it and returned it to me within 2 days!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Student",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      content: "Found someone's laptop at the coffee shop and posted it on FoundX. The owner contacted me within hours. Such an amazing platform for helping others!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      content: "The AI search feature is incredible! I described my lost phone and it instantly showed me a matching found item. Got my phone back in perfect condition.",
      rating: 5
    }
  ];

  return (
    <Container>
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">What Our Community Says</h2>
          <p className="text-xl text-default-600 max-w-3xl mx-auto">
            Real stories from real people who've experienced the joy of reunion
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6 hover:shadow-xl transition-shadow duration-300">
                <CardBody className="space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-default-700 italic">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <Avatar src={testimonial.avatar} name={testimonial.name} />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-default-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default TestimonialsSection;