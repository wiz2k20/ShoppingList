namespace ShoppingList.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ShoppingList.Data.ShoppingListContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ShoppingList.Data.ShoppingListContext context)
        {
            context.ShoppingLists.AddOrUpdate(
                new Models.ShoppingList
                {
                    Name = "Groceries",
                    Items =
                    {
                        new Models.Item { Name = "Milk" },
                        new Models.Item { Name = "teste2" },
                        new Models.Item { Name = "hohoho" }
                    }
                },
                new Models.ShoppingList
                {
                    Name = "Hardware"
                }
                );
            
            
            
            
            
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
