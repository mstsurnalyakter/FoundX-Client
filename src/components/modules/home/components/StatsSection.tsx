"use client"
import { Container } from '@/src/components/UI/Container';
import { motion } from 'framer-motion';
import { Users, Heart, MapPin, Award } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <Heart className="w-8 h-8" />,
      number: "15,000+",
      label: "Items Reunited",
      color: "text-red-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      number: "50,000+",
      label: "Active Users",
      color: "text-blue-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      number: "200+",
      label: "Cities Covered",
      color: "text-green-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "98%",
      label: "Success Rate",
      color: "text-purple-500"
    }
  ];

  return (
    <Container>
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center space-y-4"
            >
              <div className={`${stat.color} flex justify-center`}>
                {stat.icon}
              </div>
              <div className="space-y-1">
                <div className="text-3xl md:text-4xl font-bold text-default-800">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-default-600">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </Container>
  );
};

export default StatsSection;