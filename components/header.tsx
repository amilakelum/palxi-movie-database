"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Film, Menu, Search, Tv, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Film className="h-6 w-6 text-primary" />
            <span>Palxi</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                <Film className="h-4 w-4" />
                Movies
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/movies/trending">Trending</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/movies/top-rated">Top Rated</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                <Tv className="h-4 w-4" />
                TV Shows
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/tv/trending">Trending</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tv/top-rated">Top Rated</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>

          <ModeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-1">
                  <Film className="h-4 w-4" /> Movies
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/movies/trending"
                      className="block p-2 hover:bg-accent rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Trending
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/movies/top-rated"
                      className="block p-2 hover:bg-accent rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Top Rated
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-1">
                  <Tv className="h-4 w-4" /> TV Shows
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/tv/trending"
                      className="block p-2 hover:bg-accent rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Trending
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tv/top-rated"
                      className="block p-2 hover:bg-accent rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Top Rated
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
