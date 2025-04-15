
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Database, LineChart, PieChart, TrendingUp, UsersRound } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillSets = [
    {
      icon: <Database className="h-8 w-8 text-primary mb-4" />,
      title: "Data Management",
      description: "Expertise in SQL, NoSQL databases, data warehousing, and ETL processes",
      skills: [
        { name: "MySQL", level: 90 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 75 },
        { name: "AWS Redshift", level: 70 },
        { name: "ETL Pipelines", level: 80 }
      ]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary mb-4" />,
      title: "Data Visualization",
      description: "Creating clear, insightful visualizations that tell compelling data stories",
      skills: [
        { name: "Tableau", level: 95 },
        { name: "Power BI", level: 90 },
        { name: "D3.js", level: 65 },
        { name: "Matplotlib", level: 85 },
        { name: "Seaborn", level: 80 }
      ]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary mb-4" />,
      title: "Statistical Analysis",
      description: "Advanced statistical methods to uncover patterns and relationships in data",
      skills: [
        { name: "Hypothesis Testing", level: 85 },
        { name: "Regression Analysis", level: 90 },
        { name: "Time Series", level: 80 },
        { name: "ANOVA", level: 75 },
        { name: "Cluster Analysis", level: 85 }
      ]
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary mb-4" />,
      title: "Programming & Tools",
      description: "Using programming languages and tools to manipulate and analyze data efficiently",
      skills: [
        { name: "Python", level: 90 },
        { name: "R", level: 85 },
        { name: "SQL", level: 95 },
        { name: "Excel", level: 90 },
        { name: "Google Data Studio", level: 80 }
      ]
    },
    {
      icon: <PieChart className="h-8 w-8 text-primary mb-4" />,
      title: "Business Intelligence",
      description: "Transforming data into actionable business insights and dashboards",
      skills: [
        { name: "KPI Development", level: 90 },
        { name: "Executive Dashboards", level: 95 },
        { name: "Reporting", level: 90 },
        { name: "Forecasting", level: 85 },
        { name: "Business Metrics", level: 90 }
      ]
    },
    {
      icon: <UsersRound className="h-8 w-8 text-primary mb-4" />,
      title: "Communication",
      description: "Translating complex findings into clear recommendations for stakeholders",
      skills: [
        { name: "Data Storytelling", level: 95 },
        { name: "Technical Writing", level: 85 },
        { name: "Presentation", level: 90 },
        { name: "Documentation", level: 85 },
        { name: "Cross-functional Collaboration", level: 90 }
      ]
    }
  ];

  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Technical Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My comprehensive skill set spans data analysis, visualization, and business intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillSets.map((skillSet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border h-full">
                <CardHeader className="pb-2">
                  {skillSet.icon}
                  <CardTitle>{skillSet.title}</CardTitle>
                  <CardDescription>{skillSet.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {skillSet.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: 0.3 + skillIndex * 0.1 }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
