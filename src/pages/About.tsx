
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PageTransition from '@/components/PageTransition';
import { Download, Award, LucideGraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const About = () => {
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
    role: 'Senior Data Analyst',
    company: 'Global Tech Solutions',
    period: '2022 - Present',
    description: 'Leading data analysis projects for Fortune 500 clients, implementing automated reporting solutions, and developing predictive models.'
  }, {
    role: 'Data Analyst',
    company: 'Marketing Analytics Inc.',
    period: '2019 - 2022',
    description: 'Analyzed marketing campaign performance, customer behavior patterns, and market trends to optimize strategies and increase ROI.'
  }, {
    role: 'Junior Analyst',
    company: 'Data Insights Co.',
    period: '2017 - 2019',
    description: 'Supported data collection, cleaning, and preliminary analysis for various business units. Created regular reports and dashboards.'
  }];
  const education = [{
    degree: 'Master of Science in Data Science',
    institution: 'University of Data Analytics',
    year: '2016 - 2017'
  }, {
    degree: 'Bachelor of Science in Statistics',
    institution: 'State University',
    year: '2012 - 2016'
  }];
  const certifications = ['Google Data Analytics Professional Certificate', 'Microsoft Certified: Data Analyst Associate', 'Tableau Desktop Specialist', 'IBM Data Science Professional Certificate', 'Python for Data Science and Machine Learning Bootcamp'];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
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
              <Button className="gap-2 bg-primary">
                <Download className="h-4 w-4" /> Download Resume
              </Button>
            </div>
            <div className="relative">
              <img alt="Professional headshot" src="/lovable-uploads/d0fa852d-fd8e-4440-9b28-01801f40c0f1.jpg" className="rounded-lg w-full max-w-md mx-auto shadow-lg object-none" />
              {/* Decorative element */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-primary rounded-lg" />
            </div>
          </div>

          {/* Skills section */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Technical Skills</h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {skills.map(skill => (
                <motion.div key={skill.name} className="space-y-2" variants={item}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Work Experience */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Work Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => <Card key={index} className="border">
                  <CardContent className="pt-6">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.period}</p>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          {/* Education and Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <LucideGraduationCap className="h-5 w-5 text-primary" /> Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => <div key={index} className="border-l-2 border-primary pl-4 py-1">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>)}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" /> Certifications
              </h2>
              <ul className="space-y-3">
                {certifications.map((cert, index) => <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span> {cert}
                  </li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
export default About;
