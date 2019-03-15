package main

import "os"

func main() {
	// read cmd arg(i.e github trending repo url)
	args := os.Args[1:] //args contains urls

	// channel which collects data from crawler
	mainChan := make(chan string)

	// start crawling
	for i := 0; i < len(args); i++ {
		go crawl(args[i], mainChan)
	}

	// post results back to nodejs thread
}

// crawls listed websites in README
func crawl(url string, mainChan chan string) {

}
