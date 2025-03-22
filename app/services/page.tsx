"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Share2, Camera, Palette, Brush, ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: <Share2 className="h-12 w-12" />,
      title: "Social Media Management",
      description: "Boost your brand's online presence with our strategic social media marketing services. We create engaging content, manage your social media accounts, and drive meaningful engagement with your audience.",
      features: [
        "Content Strategy & Planning",
        "Community Management",
        "Analytics & Reporting",
        "Paid Social Campaigns"
      ]
    },
    {
      icon: <Camera className="h-12 w-12" />,
      title: "Video Editing",
      description: "Transform your raw footage into compelling visual stories. Our professional video editing services help you create engaging content that captures your audience's attention.",
      features: [
        "Professional Editing",
        "Motion Graphics",
        "Color Grading",
        "Sound Design"
      ]
    },
    {
      icon: <Palette className="h-12 w-12" />,
      title: "Graphic Design",
      description: "Create stunning visuals that communicate your brand's message effectively. From logos to marketing materials, we design eye-catching graphics that make an impact.",
      features: [
        "Brand Identity Design",
        "Marketing Collateral",
        "Social Media Graphics",
        "Print Design"
      ]
    },
    {
      icon: <Brush className="h-12 w-12" />,
      title: "Branding",
      description: "Build a strong, cohesive brand identity that sets you apart from the competition. We help you develop a unique brand voice and visual identity.",
      features: [
        "Brand Strategy",
        "Visual Identity",
        "Brand Guidelines",
        "Brand Messaging"
      ]
    }
  ]

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive digital marketing solutions tailored to help your business grow and succeed in the digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={ref} className="py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8">
                  <div className="mb-6 text-primary">{service.icon}</div>
                  <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Learn More</Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}