"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card } from '@/components/ui/card'

export default function PortfolioPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: "TechStart Rebrand",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      description: "Complete brand redesign for a leading tech startup."
    },
    {
      title: "EcoLife Campaign",
      category: "Social Media",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop",
      description: "Sustainable living awareness campaign across multiple platforms."
    },
    {
      title: "FoodieFinds App",
      category: "Video Production",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop",
      description: "Promotional video series for a food discovery app."
    },
    {
      title: "Urban Fitness",
      category: "Graphic Design",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=500&fit=crop",
      description: "Brand identity and marketing materials for a fitness chain."
    },
    {
      title: "ArtGallery Virtual Tour",
      category: "Video Production",
      image: "https://images.unsplash.com/photo-1492551557933-34265f7af79e?w=800&h=500&fit=crop",
      description: "Virtual gallery tour series during global lockdown."
    },
    {
      title: "GreenTech Solutions",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      description: "Environmental technology company brand development."
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl text-muted-foreground">
              Showcasing our best work and the successful projects we've delivered for our clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section ref={ref} className="py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative aspect-[16/10]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-primary font-medium">{project.category}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3">{project.title}</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}