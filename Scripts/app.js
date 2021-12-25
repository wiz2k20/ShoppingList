var currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();
    currentList.items = new Array();

    // Web Service Call
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ShoppingListsEF/",
        data: currentList,
        success: function (result) {
            currentList = result;
            showShoppingList();
            history.pushState({ id: result.id }, result.name, "?id=" + result.id);
            //drawItems();
        }
        /*
        error: function () {
            console.error("Something bad happened!");
        }
        */
    });

    //showShoppingList();
}

function showShoppingList() {
    $("#shoppingListTitle").html(currentList.name);
    $("#shoppingListItems").empty();

    $("#createListDiv").hide();
    $("#shoppingListDiv").show();

    $("#newItemName").val("");
    $("#newItemName").focus();
    $("#newItemName").unbind("keydown");
    $("#newItemName").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
            addItem();
        }
    });
}

function addItem() {
    var newItem = {};
    newItem.name = $("#newItemName").val();
    newItem.shoppingListID = currentList.id;

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ItemsEF/",
        data: newItem,
        success: function (result) {
            currentList = result;
            drawItems();
            $("#newItemName").val("");
        }
    });
    /*
    currentList.items.push(newItem);
    console.info(currentList);
    */
}

function drawItems() {
    var $list = $("#shoppingListItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name)
            .attr("id", "item_" + i);
        var $deleteBtn =
            $("<button onclick='deleteItem(" + currentItem.id + ")'>D</button>").appendTo($li);
        var $checkBtn =
            $("<button onclick='checkItem(" + currentItem.id + ")'>C</button>").appendTo($li);

        if (currentItem.checked) {
            $li.addClass("checked");
        }

        $li.appendTo($list);
    }
}

function deleteItem(itemId) {
    /*
    currentList.items.splice(index, 1);
    drawItems();
    */
    $.ajax({
        type: "DELETE",
        dataType: "json",
        url: "api/ItemsEF/" + itemId,
        success: function (result) {
            currentList = result;
            drawItems();
        }
    });
}

function checkItem(itemId) {
    /*
    var item = currentList.items[index];
    item.checked = !item.checked;
    */

    var changedItem = {};

    for (var i = 0; i < currentList.items.length; i++) {
        if (currentList.items[i].id == itemId) {
            changedItem = currentList.items[i];
        }
    }

    changedItem.checked = !changedItem.checked;

    $.ajax({
        type: "PUT",
        dataType: "json",
        url: "api/ItemsEF/" + itemId,
        data: changedItem,
        success: function (result) {
            //currentList = result;
            changedItem = result;
            drawItems();
        }
    });

    /*
    if ($("#item_" + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked");
    }
    else {
        $("#item_" + index).addClass("checked");
    }
    */
}

function getShoppingListById(id) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/ShoppingListsEF/" + id,
        success: function (result) {
            currentList = result;
            showShoppingList();
            drawItems();
        }
        /*
        error: function () {
            console.error("Something bad happened!");
        }
        */
    })
   /*
    console.info(id);

    currentList.name = "Mock Shopping List";
    currentList.items = [
        { name: "Milk" },
        { name: "Cornflakes" },
        { name: "Morango" }
    ];

    showShoppingList();
    drawItems();
    */
}

function hideShoppingList() {
    $("#createListDiv").show();
    $("#shoppingListDiv").hide();

    $("#shoppingListName").val("");
    $("#shoppingListName").focus();
    $("#shoppingListName").unbind("keydown")
    $("#shoppingListName").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
            createShoppingList();
        }
    });


}

$(document).ready(function () {
    console.info("ready");
    hideShoppingList();
    /*
    $("#shoppingListName").keyup(function (event) {
        if (event.which == 13) {
            createShoppingList();
        }
    });
    */
    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");
    if (idIndex != -1) {
        getShoppingListById(pageUrl.substring(idIndex + 4));
    }
    window.onpopstate = function (event) {
        if (event.state = null) {
            hideShoppingList();
        }
        else {
            getShoppingListById(event.state.id);
        }
    }
});