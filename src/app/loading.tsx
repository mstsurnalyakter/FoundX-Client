'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Logo } from '@/src/assets/icons'

const loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Logo */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary p-3 shadow-lg">
            <Logo className="w-full h-full text-white" />
          </div>
          
          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-primary"
          />
        </motion.div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xl font-semibold text-foreground"
          >
            FoundX
          </motion.h2>
          <motion.p
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-muted-foreground"
          >
            Loading your experience...
          </motion.p>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 0.6, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-default-200 rounded-full overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="h-full w-1/3 bg-gradient-to-r from-primary to-secondary rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

export default loading