interface Writeup {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const writeupData: Writeup[] = [
  {
    title: 'PicoCTF',
    description: `picoCTF is a cybersecurity competition designed to teach and test participants' skills in various areas of computer security. What if you could look up any information in the world? Webpages, images, videos, and more. Google has many features to help you find exactly what you're looking for. Similarly, picoCTF challenges you to search for vulnerabilities, solve problems, and learn about cybersecurity in a fun and engaging way.`,
    imgSrc: '/static/images/pico.jpg',
    href: 'https://picoctf.org/',
  },
  {
    title: 'PicoCTF2025',
    description: 'Unofficial writeup for the picoCTF challenge',
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/picoCTF2025',
  },
]

export default writeupData
