package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"log"
)

func main() {
	fmt.Print("Hello World")

	app := fiber.New()

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("Server ok")
	})

	log.Fatal(app.Listen(":4000"))
}
