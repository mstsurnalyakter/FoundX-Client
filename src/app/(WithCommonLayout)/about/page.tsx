'use client';

import { Container } from '@/src/components/UI/Container';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Avatar } from '@heroui/avatar';
import { Divider } from '@heroui/divider';
import { 
  Heart, 
  Users, 
  Search, 
  Shield, 
  Globe, 
  Award,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "Easy Search",
      description: "Advanced search filters help you find lost items quickly and efficiently."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure Platform",
      description: "Your data is protected with industry-standard security measures."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Community Driven",
      description: "Join thousands of helpful community members reuniting people with their belongings."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Global Reach",
      description: "Connect with people worldwide to find and return lost items across different cities."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Items Reunited" },
    { number: "25,000+", label: "Active Users" },
    { number: "150+", label: "Cities Covered" },
    { number: "95%", label: "Success Rate" }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      bio: "Passionate about connecting communities and helping people."
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      bio: "Tech enthusiast focused on building scalable solutions."
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      bio: "Dedicated to fostering positive community interactions."
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <Container>
      <div className="py-12 space-y-16">
        {/* Hero Section */}
        <motion.section 
          className="text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About FoundX
            </h1>
            <p className="text-xl md:text-2xl text-default-600 max-w-3xl mx-auto">
              Reuniting people with their lost belongings through the power of community
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/found-items">
              <Button color="primary" size="lg" endContent={<ArrowRight className="w-4 h-4" />}>
                Browse Found Items
              </Button>
            </Link>
            <Link href="/profile/create-post">
              <Button variant="bordered" size="lg">
                Post Found Item
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section {...fadeInUp} className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-lg text-default-600 max-w-4xl mx-auto leading-relaxed">
              We believe that every lost item has a story and deserves to find its way back home. 
              FoundX exists to bridge the gap between finders and losers, creating a trusted platform 
              where acts of kindness happen every day. Our mission is to build a global community 
              where losing something doesn't mean losing hope.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center">
              <CardBody>
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p className="text-default-600">
                  We understand the emotional value of personal belongings and treat every case with empathy.
                </p>
              </CardBody>
            </Card>

            <Card className="p-6 text-center">
              <CardBody>
                <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Trust</h3>
                <p className="text-default-600">
                  Building a secure environment where users can confidently share and claim items.
                </p>
              </CardBody>
            </Card>

            <Card className="p-6 text-center">
              <CardBody>
                <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-default-600">
                  Fostering connections between strangers who become heroes in each other's stories.
                </p>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section {...fadeInUp} className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center space-y-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-default-600">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section {...fadeInUp} className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose FoundX?</h2>
            <p className="text-lg text-default-600 max-w-3xl mx-auto">
              We've designed FoundX with both finders and seekers in mind, creating features that make 
              the reunion process as smooth and secure as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                  <CardBody className="text-center space-y-4">
                    <div className="flex justify-center">{feature.icon}</div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-default-600">{feature.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section {...fadeInUp} className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-lg text-default-600 max-w-3xl mx-auto">
              Simple steps to reunite lost items with their owners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Found Something?</h3>
              <p className="text-default-600">
                Post details about the item you found with photos and location information.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Lost Something?</h3>
              <p className="text-default-600">
                Search through found items and submit a claim request if you find your belonging.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Get Reunited!</h3>
              <p className="text-default-600">
                Verify ownership through our secure process and arrange a safe meetup.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section {...fadeInUp} className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Meet Our Team</h2>
            <p className="text-lg text-default-600 max-w-3xl mx-auto">
              The passionate individuals working to make lost items a thing of the past
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <CardBody className="space-y-4">
                    <Avatar 
                      src={member.image} 
                      className="w-24 h-24 mx-auto" 
                      name={member.name}
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                    <p className="text-default-600">{member.bio}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section {...fadeInUp} className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Make a Difference?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join our community of helpful individuals who believe in the power of kindness. 
              Every found item is a chance to brighten someone's day.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button color="secondary" size="lg" className="font-semibold">
                  Join FoundX Today
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="bordered" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Contact Info */}
        <motion.section {...fadeInUp} className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Get In Touch</h2>
            <p className="text-lg text-default-600">
              Have questions or suggestions? We'd love to hear from you!
            </p>
          </div>

          <div id='contact' className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <CardBody className="space-y-4">
                <Mail className="w-12 h-12 text-primary mx-auto" />
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-default-600">support@foundx.com</p>
                </div>
              </CardBody>
            </Card>

            <Card className="p-6 text-center">
              <CardBody className="space-y-4">
                <Phone className="w-12 h-12 text-primary mx-auto" />
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-default-600">+1 (555) 123-4567</p>
                </div>
              </CardBody>
            </Card>

            <Card className="p-6 text-center">
              <CardBody className="space-y-4">
                <MapPin className="w-12 h-12 text-primary mx-auto" />
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p className="text-default-600">123 Found Street, City, State</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </motion.section>
      </div>
    </Container>
  );
};

export default AboutPage;