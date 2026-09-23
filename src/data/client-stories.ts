// Published on the original site's Testimonial.to wall. See docs/content-source-notes.md.
export const testimonialSource =
  "https://embed-v2.testimonial.to/w/the-roadmap/?theme=light&card=large&loadMore=on&initialCount=20&tag=all";

export const clientVideos = [
  {
    slug: "mohnish-pabrai",
    name: "Mohnish Pabrai",
    role: "Investor & philanthropist",
    playbackId: "ayxc202Y008Tz00wiJ01qC1aMOypaE7s1QkTfNAkLnWdQYA",
    sourceId: "4e0bb33d-ccbf-4f51-9844-8ca2701ebf85",
  },
  {
    slug: "rob-fraser",
    name: "Rob Fraser",
    role: "Founder of Outway",
    playbackId: "j7QW2Mb1VicFCpserFkjLOmjgfGkZ4102GNxJwFzGsBM",
    sourceId: "ec67c7c0-5b17-4857-927d-c58226002ca6",
  },
  {
    slug: "matt-clark",
    name: "Matt Clark",
    role: "Amazing Partners Inc.",
    playbackId: "bT5Bk1pppyWmPmTLv6BIhp8sC00ycEdKn3DLncQN6w01M",
    sourceId: "916d820d-fa74-4212-8137-8392c2467103",
  },
] as const;
export type ClientVideo = (typeof clientVideos)[number];

export const clientQuotes = [
  {
    name: "Andrew Wilkinson",
    theme: "A different next chapter",
    quote: "Doing The Roadmap changed my life.",
    date: "2023-09-04",
  },
  {
    name: "Vaishnavi Behara",
    theme: "A stronger sense of direction",
    quote: "clear in my purpose.",
    date: "2025-07-09",
  },
  {
    name: "Ryan",
    theme: "Recognizing your strengths",
    quote: "understand the heart of their gift.",
    date: "2025-01-08",
  },
] as const;

export const storyPerspectives = [
  {
    name: "Clint Salter",
    title: "After a business exit",
    summary:
      "After selling a company, Clint wanted work that better reflected his interests. He describes greater confidence in pursuing creative projects and protecting his independence.",
  },
  {
    name: "Vin",
    title: "At a career crossroads",
    summary:
      "Vin was unsure about his next professional move. He describes recognizing thought patterns that held him back and understanding the work that suited him.",
  },
  {
    name: "Rich Myerson",
    title: "Beyond financial success",
    summary:
      "Rich describes feeling unfulfilled despite financial success. He credits Jack with helping him approach important decisions with greater confidence and less need for control.",
  },
] as const;
