package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"log"
)

type Todo struct {
	ID     int    `json:"id"`
	Titulo string `json:"titulo"`
	Feito  bool   `json:"feito"`
	Body   string `json:"body"`
}

func main() {
	fmt.Print("Hello World")

	app := fiber.New()

	todos := []Todo{}

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("Server ok")
	})

	app.Post("api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}

		if err := c.BodyParser(todo); err != nil {
			return err
		}

		todo.ID = len(todos) + 1

		todos = append(todos, *todo)

		return c.JSON(todos)

	})

	app.Patch("api/todos/:id/done", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(401).SendString("ID inválido")
		}

		for i, t := range todos {
			if t.ID == id {
				todos[i].Feito = true
				break
			}
		}
		return c.JSON(todos)
	})

	log.Fatal(app.Listen(":4000"))
}
