"use client"

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Brush, 
  Camera, 
  Share2, 
  Palette,
  ArrowRight,
  Star,
  ChevronRight
} from 'lucide-react'
import { cardVariants, cardContainerVariants } from '@/lib/animations'
import { setupCardAnimations } from '@/lib/card-animations'

import './animations/card-popup.css'
import './animations/card-hover.css'
import './animations/card-touch.css'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Use the extracted card animation setup
  useEffect(() => {
    // Setup card animations and get cleanup function
    const cleanup = setupCardAnimations();
    
    // Return cleanup function
    return cleanup;
  }, []);

  const containerVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: { 
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const services = [
    {
      icon: <Share2 className="h-8 w-8" />,
      title: "Social Media Management",
      description: "Strategic social media marketing to boost your brand's online presence."
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Video Editing",
      description: "Professional video editing services for engaging content creation."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Graphic Design",
      description: "Eye-catching designs that communicate your brand's message effectively."
    },
    {
      icon: <Brush className="h-8 w-8" />,
      title: "Branding",
      description: "Comprehensive branding solutions to make your business stand out."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "Working with Sleeksols Media transformed our digital presence. Their team's creativity and expertise delivered exceptional results.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director, InnovateCo",
      content: "The level of professionalism and attention to detail is outstanding. They truly understand digital marketing.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    }
  ]

  // Define MemoizedCard component outside of JSX
  const MemoizedCard = React.memo(({ service }: { service: typeof services[0] }) => (
    <motion.div variants={cardVariants} whileHover="hover" className="cursor-pointer">
      <Card className="card p-6 h-full hover:shadow-lg transition-shadow bg-background/50 backdrop-blur-lg border-accent/20">
        <div className="mb-4 text-secondary">{service.icon}</div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{service.title}</h3>
        <p className="text-muted-foreground text-sm">{service.description}</p>
      </Card>
    </motion.div>
  ));

  return (
    <div className="min-h-screen bg-white dark:bg-sleeksols-dark text-black dark:text-white transition-colors duration-200">
      {/* Hero Section */}
      <section 
        ref={containerRef}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden perspective-1000"
      >
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-primary to-secondary/50"
        />
        <div className="container mobile-container relative z-10 py-12 md:py-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 flex flex-col items-center justify-center space-y-4"
          >
            <motion.div 
              variants={wordVariants}
              className="mobile-heading font-bold tracking-tight text-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-celadon">Sleek</span>
              <span className="text-white">sols</span>
            </motion.div>
            <motion.div 
              variants={wordVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
              style={{ transformStyle: "preserve-3d" }}
            >
              Media
            </motion.div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mobile-text text-gray-200 mb-8 max-w-2xl mx-auto text-center px-4"
          >
            Innovative digital marketing solutions that drive results and elevate your brand.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <Button size="lg" className="w-full sm:w-auto bg-celadon text-black-olive hover:bg-celadon/90">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-celadon text-celadon hover:bg-celadon hover:text-black-olive">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesRef}
        className="py-16 md:py-24 bg-black-olive/5 dark:bg-black-olive/20"
      >
        <div className="container mobile-container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="mobile-heading font-bold mb-4">Our Services</h2>
            <p className="mobile-text text-muted-foreground max-w-2xl mx-auto">
              Comprehensive digital marketing solutions tailored to your needs
            </p>
          </div>
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {services.map((service) => (
              <MemoizedCard key={service.title} service={service} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-16 md:py-24">
        <div className="container mobile-container">
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02, // Further reduced scale for testimonial cards
                  transition: {
                    duration: 0.2,
                    ease: "easeInOut"
                  }
                }}
                className="cursor-pointer testimonial-card"
              >
                <Card className="card p-6 border-cal-poly-green/20">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full mr-4"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">{testimonial.content}</p>
                  <div className="flex mt-4 text-celadon">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          className="py-24 bg-gradient-to-br from-primary to-secondary"
        >
          <div className="container text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-4 fade-in">
              Ready to Transform Your Digital Presence?
            </h2>
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 fade-in"
            >
              Contact Us
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  )
} // End of Home component
