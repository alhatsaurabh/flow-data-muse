
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Database, LineChart, PieChart, TrendingUp, UsersRound } from 'lucide-react';

const Skills = () => {
  const skillSets = [
    {
      icon: <Database className="h-8 w-8 text-primary mb-4" />,
      title: "Data Management",
      description: "Expertise in SQL, NoSQL databases, data warehousing, and ETL processes",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "AWS Redshift", "ETL Pipelines"]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary mb-4" />,
      title: "Data Visualization",
      description: "Creating clear, insightful visualizations that tell compelling data stories",
      skills: ["Tableau", "Power BI", "D3.js", "Matplotlib", "Seaborn"]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary mb-4" />,
      title: "Statistical Analysis",
      description: "Advanced statistical methods to uncover patterns and relationships in data",
      skills: ["Hypothesis Testing", "Regression Analysis", "Time Series", "ANOVA", "Cluster Analysis"]
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary mb-4" />,
      title: "Programming & Tools",
      description: "Using programming languages and tools to manipulate and analyze data efficiently",
      skills: ["Python", "R", "SQL", "Excel", "Google Data Studio"]
    },
    {
      icon: <PieChart className="h-8 w-8 text-primary mb-4" />,
      title: "Business Intelligence",
      description: "Transforming data into actionable business insights and dashboards",
      skills: ["KPI Development", "Executive Dashboards", "Reporting", "Forecasting", "Business Metrics"]
    },
    {
      icon: <UsersRound className="h-8 w-8 text-primary mb-4" />,
      title: "Communication",
      description: "Translating complex findings into clear recommendations for stakeholders",
      skills: ["Data Storytelling", "Technical Writing", "Presentation", "Documentation", "Cross-functional Collaboration"]
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
            <Card key={index} className="border">
              <CardHeader className="pb-2">
                {skillSet.icon}
                <CardTitle>{skillSet.title}</CardTitle>
                <CardDescription>{skillSet.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {skillSet.skills.map((skill, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
