package main

import "os"

func main() {
	// read cmd arg(i.e github trending repo url)
	args := os.Args[1:] //args contains urls

	// start crawling
	for i:=0; i<len(args); i++ {
		go crawl(args[i]);
	}
	
	// post results back to nodejs thread
}

// crawls listed websites in README
func crawl(url string) {

}
