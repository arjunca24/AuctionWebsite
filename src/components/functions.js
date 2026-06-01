//Format text into lines so that text doesn't increase the width of the container
//Uses recursion to seperate into multiple lines
export function formatTextIntoLines(text,charactersPerLine){
  const n = text.length
  if (n<= 20){ //Base Case
    return text
  }
  else{
    return [text.substring(0,charactersPerLine),<br/> //Recursive Case, <br/> is line break 
           ,formatTextIntoLines(text.substring(charactersPerLine,n),charactersPerLine)]
  }
}

//Convert SQL dates to JS date object
export function SQLDatetoJsDate(date){
    let year = date.substring(0,4)
    let month = date.substring(5,7)-1 //JS counts months from 0 to 11 instead of 1 to 12
    let day = date.substring(8,10)

    let hour = date.substring(11,13)
    let minute = date.substring(14,16)
    let second = date.substring(17,19)

    return new Date(year,month,day,hour,minute,second)
}
