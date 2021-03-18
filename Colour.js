
function ChangeColour()   
     {  
          document.getElementById('b2’).style.backgroundColour = 'Red';  
          setTimeout("ChangeColour2()", 2000);  
     }  
  
     function ChangeColour2()   
     {  
          document.getElementById('b2’).style.backgroundColour = 'Yellow';  
          setTimeout("ChangeColour3()", 2000);  
     }  
  
     function ChangeColour3()   
     {  
          document.getElementById('b2’).style.backgroundColour = 'Green';  
          setTimeout("ChangeColour4()", 2000);  
     }  
  
     
