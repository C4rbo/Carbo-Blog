'use client'

import { useEffect, useState, useRef } from 'react'

interface TerminalLine {
  text: string
  delay?: number
  blink?: boolean
  prompt?: boolean
  typingSpeed?: number
}

export default function Terminal() {
  const [lines, setLines] = useState<{ text: string; prompt?: boolean }[]>([])
  const [displayText, setDisplayText] = useState('')
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)

  const terminalLines: TerminalLine[] = [
    { text: 'Welcome to Carbo Terminal', delay: 500 },
    { text: '(c) 2025 Carbo. All rights reserved.', delay: 300 },
    { text: '', delay: 500 },
    { text: 'user@carbo:~$ whoami', prompt: true, typingSpeed: 30 },
    { text: 'carbo', delay: 200 },
    { text: 'user@carbo:~$ uname -a', prompt: true, typingSpeed: 20 },
    {
      text: 'Linux carbo-terminal 5.15.0-76-generic #83-Ubuntu SMP Thu March 15 19:16:32 UTC 2025 x86_64 x86_64 x86_64 GNU/Linux',
      delay: 100,
    },
    { text: 'user@carbo:~$ skills --show', prompt: true, typingSpeed: 15 },
    { text: 'Languages: Python, Java, JavaScript/TypeScript, C/C++, SQL, MYSQL', delay: 50 },
    { text: 'Frameworks: Next.js, React', delay: 50 },
    { text: 'Software Developer and Cybersecurity enthusiast', delay: 50 },
    { text: 'Tools: Git, Docker, Wireshark, BurpSuite', delay: 50 },
    { text: 'user@carbo:~$ cat interests.txt', prompt: true, typingSpeed: 25 },
    { text: 'Open Source Development', delay: 30 },
    { text: 'Reverse Engineering', delay: 30 },
    { text: 'CTF Competitions', delay: 30 },
    { text: 'user@carbo:~$ _', prompt: true, blink: true, typingSpeed: 20 },
  ]

  useEffect(() => {
    const terminal = terminalRef.current
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  }, [lines, displayText])

  useEffect(() => {
    if (currentLineIndex < terminalLines.length) {
      const line = terminalLines[currentLineIndex]
      const speed = line.typingSpeed || 40
      let charIndex = 0

      if (line.text === '') {
        setTimeout(() => {
          setCurrentLineIndex(currentLineIndex + 1)
        }, line.delay || 500)
        return
      }

      const typeWriter = setInterval(() => {
        if (charIndex <= line.text.length) {
          setDisplayText(line.text.substring(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeWriter)

          setLines((prev) => [
            ...prev,
            {
              text: line.text,
              prompt: line.prompt,
            },
          ])

          setDisplayText('')

          setTimeout(() => {
            setCurrentLineIndex(currentLineIndex + 1)
          }, line.delay || 100)
        }
      }, speed)

      return () => clearInterval(typeWriter)
    }
  }, [currentLineIndex])

  return (
    <div className="mx-auto mt-10 w-full max-w-3xl overflow-hidden rounded-lg border border-gray-800 bg-gray-950/80 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-gray-800/50 bg-gray-900/50 px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500/60 transition-colors hover:bg-red-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-green-500/60 transition-colors hover:bg-green-500/80"></div>
        </div>
        <div className="font-mono text-xs tracking-tight text-gray-400/80">carbo@terminal:~</div>
        <div className="w-12"></div>
      </div>

      <div
        ref={terminalRef}
        className="h-96 overflow-auto bg-gray-950/70 p-4 font-mono text-sm text-gray-200/90"
      >
        <div className="mb-2 text-gray-400/80 italic">
          Last login: {new Date().toLocaleString()} from 127.0.0.1
        </div>

        {lines.map((line, index) => (
          <div key={index} className={`mb-1 ${line.prompt ? 'text-gray-50' : 'text-gray-300/90'}`}>
            {line.prompt && <span className="mr-1.5 font-semibold text-green-400/90">➜</span>}
            {line.text}
          </div>
        ))}

        {displayText && (
          <div
            className={`mb-1 ${terminalLines[currentLineIndex]?.prompt ? 'text-gray-50' : 'text-gray-300/90'}`}
          >
            {terminalLines[currentLineIndex]?.prompt && (
              <span className="mr-1.5 font-semibold text-green-400/90">➜</span>
            )}
            {displayText}
            {terminalLines[currentLineIndex]?.blink && (
              <span className="ml-0.5 animate-pulse text-green-400/80">▮</span>
            )}
          </div>
        )}

        <div className="h-1"></div>
      </div>
    </div>
  )
}
