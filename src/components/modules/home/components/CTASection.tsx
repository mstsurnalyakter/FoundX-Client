"use client"
import { Container } from '@/src/components/UI/Container';
import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CTASection = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Make Someone's Day?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of kind-hearted people who are making a difference one lost item at a time.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button 
                color="secondary" 
                size="lg" 
                className="font-semibold text-lg px-8"
              >
                Join FoundX Today
              </Button>
            </Link>
            <Link href="/found-items">
              <Button 
                variant="bordered" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8"
              >
                Browse Lost Items
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default CTASection;