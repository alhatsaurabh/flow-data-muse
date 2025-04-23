
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PageTransition from '@/components/PageTransition';
import { Download, Award, LucideGraduationCap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const About = () => {
  const [animateSkills, setAnimateSkills] = useState(false);
  
  useEffect(() => {
    // Set a short delay before starting animation for better UX
    const timer = setTimeout(() => {
      setAnimateSkills(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const skills = [{
    name: 'Data Analysis',
    level: 95
  }, {
    name: 'SQL',
    level: 90
  }, {
    name: 'Python',
    level: 85
  }, {
    name: 'Data Visualization',
    level: 92
  }, {
    name: 'Excel & Google Sheets',
    level: 95
  }, {
    name: 'R',
    level: 80
  }, {
    name: 'Machine Learning',
    level: 75
  }, {
    name: 'Statistical Analysis',
    level: 88
  }];
  
  const experiences = [{
    role: 'Working Student Data Analyst',
    company: 'Netzorange IT -Dienstleistungen GmbH & Co. KG',
    period: '2024 - Present',
    description: 'Helped turn messy data into clear insights for smarter business decisions.'
  }, {
    role: 'Jr. Data Analyst',
    company: 'M Global Design Estate',
    period: '2019 - 2022',
    description: 'Supported surveys and turned responses into visuals and reports clients could actually use.'
  }, {
    role: 'Machine Learning Intern',
    company: ' Code Karo Yaaro',
    period: '2018',
    description: 'Improved a chatbot and cleaned data to make things work faster and better.'
  }];
  
  const education = [{
    degree: 'Master of Business Administration',
    institution: 'Arden University, Germany',
    year: '2023 - 2024'
  }, {
    degree: 'Bachelor of Science (BSc), Information Technology',
    institution: 'Pillai College of Arts, Commerce, and Science, India',
    year: '2019 - 2022'
  }];
  
  const certifications = [
    'Coming soon : ',
    'Google Data Analytics Professional Certificate', 
    'Microsoft Certified: Data Analyst Associate', 
    'Tableau Desktop Specialist', 
    'IBM Data Science Professional Certificate', 
  ];

  return (
    <PageTransition>
      <section className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">About Me</h1>
              <p className="text-muted-foreground mb-6 text-lg">
                I'm a passionate data analyst with over 8 years of experience transforming complex data into actionable business insights. My expertise spans from statistical analysis to data visualization and machine learning.
              </p>
              <p className="text-muted-foreground mb-8">
                With a background in statistics and data science, I specialize in uncovering patterns in data that drive business growth and operational efficiency. I believe that good data analysis is as much about asking the right questions as it is about technical skills.
              </p>
              <Button className="gap-2">
                <a href="/cv.pdf" download>
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </Button>
            </div>
            <div className="relative">
              <img 
                alt="Professional headshot" 
                src="/lovable-uploads/d0fa852d-fd8e-4440-9b28-01801f40c0f1.jpg" 
                className="rounded-lg w-full max-w-md mx-auto shadow-lg object-none" 
              />
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-primary rounded-lg" />
            </div>
          </div>

          {/* Skills section - Now with animations */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <TrendingUp className="text-primary h-5 w-5" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name} 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <motion.span 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: animateSkills ? 1 : 0,
                      }}
                      transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: animateSkills ? `${skill.level}%` : "0%" 
                      }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.2 + (index * 0.1),
                        ease: "easeOut"
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Work Experience */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Work Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card key={index} className="border">
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education and Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <LucideGraduationCap className="h-5 w-5 text-primary" /> Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4 py-1">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" /> Certifications
              </h2>
              <ul className="space-y-3">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span> {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;
