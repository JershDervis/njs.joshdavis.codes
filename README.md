# My Career Portfolio

This is the current project of my career portfolio. The idea is to connect this to external services like Github and LinkedIn so any career based updates can come from other external sources. This means I won't need to worry about pushing updates of what I'm doing to this site, instead it'll gather that data and display it neatly to whomever wants to see it.

## The Tech Stack

- Next.js (React on the Front End)
- Prisma / PlanetScale (MySQL)
- TailwindCSS
- tRPC - For typesafe api endpoints
- Hosted on Vercel

## Ideas / To Implement

- Cronjob to pull Github repo data (every 24 hours?)
  - With this, there is the option to server side render from the SQL db
  - OR - Rebuild the site completely - on rebuild I'd query GitHub's api
- LinkedIn updates
- Big Maybe - Write an app that tracks my work commits (as these are private this would just track numbers), and recreate GitHubs 365 day tiled commits on my website with this info to more accurately display how often I'm coding
  - This would involve adding GitHubs numbers with my own
