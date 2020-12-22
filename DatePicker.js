"use strict";

function DatePicker(id, dateCallbackFunction){
  this.id = id;
  this.dateCallbackFunction = dateCallbackFunction;
}

DatePicker.prototype.render = function(dateObj){
  //initial definitions
  var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var weekArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var page = document.getElementById(this.id);
  var container = document.createElement("div");
  page.appendChild(container);

  //create table
  var table = document.createElement("TABLE");
  container.appendChild(table);
  var todayDay = dateObj.getDate();
  
  //create header ---> < Month >
  var header =  table.createTHead();
  var headerRow = header.insertRow(0);
  
  //left button
  var leftButtonCell = headerRow.insertCell(0);
  leftButtonCell.innerHTML = "<<";
  leftButtonCell.setAttribute("id", "arrowStyle");
  
  //month
  var monthCell = headerRow.insertCell(1);
  monthCell.innerHTML = monthArray[dateObj.getMonth()] + " " + dateObj.getFullYear();
  monthCell.colSpan = "5";
  monthCell.setAttribute("id", "monthStyle");
  
  //right button
  var rightButtonCell = headerRow.insertCell(2);
  rightButtonCell.innerHTML = ">>";
  rightButtonCell.setAttribute("id", "arrowStyle");


  //add event handlers for left and right clicks
  leftButtonCell.addEventListener("click", () =>{
    container.remove();
    dateObj.setMonth(dateObj.getMonth() - 1);
    this.render(dateObj);
  });

  rightButtonCell.addEventListener("click", () =>{
    container.remove();
    dateObj.setMonth(dateObj.getMonth() + 1);
    this.render(dateObj);
  });

  //add days of the week
  var weekRow = table.insertRow(1);
  for (var weekday = 0; weekday < 7; weekday++){
    var weekDayCell = weekRow.insertCell(weekday);
    weekDayCell.innerHTML = weekArray[weekday];
  } 

  //populate first week with rollover from last month
  var thisMonth = dateObj.getMonth();
  var todayYear = dateObj.getFullYear();

  dateObj.setDate(1); 
  dateObj.setDate(dateObj.getDate() - dateObj.getDay());

  var currRowNum = 2;
  var continueFilling = true;

  while (continueFilling){
    var currRow = table.insertRow(currRowNum);

    for (var cell = 0; cell < 7; cell++){
      var currCell = currRow.insertCell(cell);
      currCell.innerHTML = dateObj.getDate();
      
      //if not in this month, grey out the block
      if (dateObj.getMonth() !== thisMonth){
        currCell.setAttribute("class", "greyed-out");

      } else {
        if (dateObj.getDate() === todayDay){
          currCell.setAttribute("class", "today");
        }
        else{
          currCell.setAttribute("class", "active-date");
        }
        var self = this;
        //if that specific cell is clicked
        var dateClicked = {
          month: dateObj.getMonth(),
          day: currCell.innerHTML,
          year: dateObj.getFullYear()
        };
        currCell.addEventListener("click", function(){
          self.dateCallbackFunction(self.id, dateClicked);
          var oldClicked = page.getElementsByClassName("today");
          oldClicked[0].setAttribute("class", "active-date");
          this.setAttribute("class", "today");
        });
      }
      dateObj.setDate(dateObj.getDate() + 1);
    }

    if (dateObj.getMonth() !== thisMonth){
      continueFilling = false;
      dateObj.setFullYear(todayYear, thisMonth, todayDay);
    }
    currRowNum += 1;  
  }
};

