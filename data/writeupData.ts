interface Writeup {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const writeupData: Writeup[] = [
  {
    title: 'PicoCTF2025',
    description: 'Unofficial writeup for the picoCTF challenge',
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/picoCTF2025',
  },
]

export default writeupData
