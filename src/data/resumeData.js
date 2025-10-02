// src/data/resumeData.js

const resumeData = {
  education: {
    title: 'education',
    entries: [
      {
        degree: 'Master of Science in Computer Science',
        university: 'The University of Texas at Dallas',
        date: 'Dec 2023 - May 2025',
        gpa: 'GPA 3.7/4.0',
      },
      {
        degree: 'Bachelor of Science in Computer Science',
        university: 'The University of Texas at Dallas',
        date: 'Aug 2020 - Dec 2023',
        gpa: 'GPA 3.8/4.0',
      },
    ],
  },
  skills: {
    title: 'languages & technologies',
    languages:
      'Python, Java, Go, C++, C, SQL, JavaScript, TypeScript, HTML, CSS, Swift, MIPS Assembly',
    tools:
      'Git, AWS, Firebase, PostgreSQL, NewRelic, Node.js, React.js, TailwindCSS, Express.js, Linux, Jenkins, UNIX, Bash, Arduino, Jira, Databricks, Snowflake, Open Telemetry',
  },
  experience: {
    title: 'experience',
    entries: [
      {
        role: 'Software Engineer Intern',
        company: 'Capital One',
        location: 'Chicago, IL',
        date: 'June 2024 - August 2024',
        points: [
          'Enabled Open-Telemetry and NewRelic to monitor the secured card returns process, providing actionable metrics on internal systems and enhancing the reliability of system performance',
          'Developed a dashboard using Go and React, providing real-time analytics and insights on the returns process',
          'Collaborated with teams to integrate various monitoring tools for seamless data flow and system optimization',
        ],
      },
      {
        role: 'Software Engineer Intern',
        company: 'Capital One',
        location: 'New York, NY',
        date: 'June 2023 - August 2023',
        points: [
          'Developed a machine learning model to deliver shopping offers to over 150k daily users accurately',
          'Implemented a targeted offer system that personalized promotions based on user purchases, resulting in a 64% increase in average revenue per user and a 66% improvement in purchase prediction accuracy',
          'Utilized various cloud computing tools to train and update models in real-time to maximize model accuracy',
        ],
      },
      {
        role: 'Early Technology Internship | Software Engineer',
        company: 'Capital One',
        location: 'McLean, VA',
        date: 'June 2022 - August 2022',
        points: [
          'Collaborated with a team of 5 to implement NewRelic Distributed Tracing in various Capital One services',
          'Orchestrated seamless communication channels across cross-functional teams, facilitating peer learning and growth, resulting in decreased rework and increased knowledge sharing',
        ],
      },
    ],
  },
  projects: {
    title: 'projects',
    entries: [
      {
        name: 'HackPortal',
        tech: 'TypeScript, Next.js, Firebase, React, TailwindCSS',
        description:
          'Developed an open-source platform to streamline hackathon management with tools for registration and check-in.',
      },
      {
        name: 'EnvSetup',
        tech: 'Bash, Powershell, Markdown',
        description:
          'Constructed an interactive terminal-based installer for programmers to help set up new devices for programming.',
      },
      {
        name: 'Recipe Browser',
        tech: 'JavaScript, Go, Python, React, TailwindCSS',
        description:
          'Created a full-stack application that employed complex components to offer users a quick recipe look-up.',
      },
    ],
  },
  activities: {
    title: 'activities',
    entries: [
      {
        role: 'Co-Director',
        organization: 'HackUTD',
        date: 'May 2022 - Dec 2024',
        description:
          'Spearheaded the organization of HackUTD, the largest 24-hour hackathon in North America, attracting 1100+ participants from diverse backgrounds.',
      },
    ],
  },
};

export default resumeData;
