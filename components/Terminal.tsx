// components/Terminal.tsx
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
    { text: 'Welcome to Carbo Terminal [Version 1.0.0]', delay: 500 },
    { text: '(c) 2023 Carbo. All rights reserved.', delay: 300 },
    { text: '', delay: 500 },
    { text: 'user@carbo:~$ whoami', prompt: true, typingSpeed: 30 },
    { text: 'carbo', delay: 200 },
    { text: 'user@carbo:~$ uname -a', prompt: true, typingSpeed: 20 },
    {
      text: 'Linux carbo-terminal 5.15.0-76-generic #83-Ubuntu SMP Thu Jun 15 19:16:32 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux',
      delay: 100,
    },
    { text: 'user@carbo:~$ skills --show', prompt: true, typingSpeed: 15 },
    { text: 'Languages: Python, JavaScript/TypeScript, C++, Rust', delay: 50 },
    { text: 'Frameworks: Next.js, React, Node.js, Django', delay: 50 },
    { text: 'Security: Ethical Hacking, Penetration Testing, Cryptography', delay: 50 },
    { text: 'Tools: Git, Docker, Wireshark, Metasploit', delay: 50 },
    { text: 'user@carbo:~$ cat interests.txt', prompt: true, typingSpeed: 25 },
    { text: 'Cybersecurity Research', delay: 30 },
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
        // Handle empty lines (just add delay)
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

          // Add the complete line to history
          setLines((prev) => [
            ...prev,
            {
              text: line.text,
              prompt: line.prompt,
            },
          ])

          setDisplayText('')

          // Move to next line after delay
          setTimeout(() => {
            setCurrentLineIndex(currentLineIndex + 1)
          }, line.delay || 100)
        }
      }, speed)

      return () => clearInterval(typeWriter)
    }
  }, [currentLineIndex])

  return (
    <div className="mx-auto mt-10 w-full max-w-3xl shadow-2xl">
      {/* Terminal Header */}
      <div className="terminal-header flex items-center justify-between rounded-t-lg bg-gray-800 px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 cursor-pointer rounded-full bg-red-500 hover:bg-red-700"></div>
          <div className="h-3 w-3 cursor-pointer rounded-full bg-yellow-500 hover:bg-yellow-700"></div>
          <div className="h-3 w-3 cursor-pointer rounded-full bg-green-500 hover:bg-green-700"></div>
        </div>
        <div className="font-mono text-sm text-gray-300">carbo@terminal: ~</div>
        <div className="w-12"></div> {/* Spacer for flex alignment */}
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        className="terminal-body h-96 overflow-auto rounded-b-lg bg-gray-900 p-4 font-mono text-green-400"
      >
        {/* Initial welcome message */}
        <div className="mb-2 text-cyan-300">
          Last login: {new Date().toLocaleString()} from 127.0.0.1
        </div>

        {/* Display previous lines */}
        {lines.map((line, index) => (
          <div key={index} className={`mb-1 ${line.prompt ? 'text-purple-400' : 'text-green-400'}`}>
            {line.prompt && <span className="text-yellow-400">➜</span>} {line.text}
          </div>
        ))}

        {/* Current typing line */}
        {displayText && (
          <div
            className={`mb-1 ${terminalLines[currentLineIndex]?.prompt ? 'text-purple-400' : 'text-green-400'}`}
          >
            {terminalLines[currentLineIndex]?.prompt && <span className="text-yellow-400">➜</span>}{' '}
            {displayText}
            {terminalLines[currentLineIndex]?.blink && (
              <span className="ml-1 animate-pulse">█</span>
            )}
          </div>
        )}

        {/* Empty line to ensure scroll stays at bottom */}
        <div className="h-1"></div>
      </div>
    </div>
  )
}
