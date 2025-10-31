import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { DemoTools, DemoToolType, demoToolsConfig } from './DemoTools';
import { ChevronRight } from 'lucide-react';

export const EnhancedFeaturesSection = () => {
  const [selectedTool, setSelectedTool] = useState<DemoToolType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToolClick = (toolId: DemoToolType) => {
    setSelectedTool(toolId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTool(null), 300);
  };

  return (
    <>
      <section id="tools" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 text-white">
              🚀 20+ AI Tools
            </Badge>
            <h2 className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
              Complete AI Productivity Suite
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
              Explore our comprehensive collection of AI-powered tools designed to boost your productivity, 
              enhance communication, and streamline your workflow. Each tool is fully functional with working demos!
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoToolsConfig.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleToolClick(tool.id)}
                  className="cursor-pointer"
                >
                  <Card className="group h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-transparent relative overflow-hidden">
                    {/* Hover Gradient Border Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity -z-10`} />
                    
                    <CardContent className="p-6 relative bg-white dark:bg-gray-900 m-[2px] rounded-[calc(var(--radius)-2px)]">
                      {/* Icon with Animation */}
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-r ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <tool.icon className="w-7 h-7 text-white" />
                      </motion.div>

                      {/* Title */}
                      <h3 className="mb-2 line-clamp-2">{tool.title}</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {tool.description}
                      </p>

                      {/* CTA */}
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center text-sm font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent"
                      >
                        Try Demo
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </motion.div>

                      {/* Floating Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          ✓ Live
                        </Badge>
                      </div>

                      {/* Shine Effect on Hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <Card className="border-l-4 border-l-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
              <CardContent className="py-6">
                <p className="text-lg">
                  🎯 <span className="font-medium">All tools are fully functional!</span> Click any card above to try the live demo with real AI processing, sample inputs, and downloadable outputs.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Demo Tools Modal */}
      <DemoTools
        toolType={selectedTool}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
