import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from './http-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calculator';
  input:string ='';
  show:string = '';
  operand1: string = '';
  operand2: string = '';
  operator1: string = '';
  operator2: string = '';
  result:string ='';
  operatorC: number = 0;

  constructor(private server: HttpService) {}

  pressN(num : string)
  {
    if(num == "0")
    {
      if(this.show == "")
        return
    }
    if(this.operatorC == 0)
    {
      if(this.result != '')
        this.result = '';
      if(num == ".")                                      // note that the decimal starts with "." not "0."
      {
        if(!(this.operand1.includes(".")))
        {
          this.operand1 = this.operand1 + num;
          this.show = this.show + num;
        }
      }
      else
      {
        this.operand1 = this.operand1 + num;
        this.show = this.show + num;
      }
    }
    else if(this.operatorC == 1)
    {
      if(!(this.operand2.includes(".")))
      {
        this.operand2 = this.operand2 + num;
        this.show = this.show + num;
      }
      else
      {
        this.operand2 = this.operand2 + num;
        this.show = this.show + num;
      }
    }
  }

  pressOP(op: string)
  {
    if(this.show !="" || (this.result != '' && this.result != "E"))
    {
      if(this.operatorC == 0 && this.operator1 == '')
      {
        this.operatorC++;
        this.operator1 = op;
        this.show = this.show + op;
        if(this.operand1 == '' && this.result != '' && this.result != "E")
        {
          this.operand1 = this.result;
          this.show = this.result;
          this.result = '';
          this.show = this.show + op;
        }
      }
      else if(this.operatorC == 1 && this.operator2 == '' && this.operand2 != '')
      {
        this.operatorC++;
        this.operator2 = op;
        this.show = this.show + op;
        this.getAnswer();
      }
    }
    this.result = '';
  }

  del()
  {
    if(this.show != "")
    {
      this.show =this.show.slice(0,-1);
      if(this.operator2 != "")
      {
        this.operator2 = '';
        this.operatorC = 1;
      }
      else if(this.operand2 != "")
        this.operand2 =this.operand2.slice(0,-1);
      else if(this.operator1 != "")
      {
        this.operator1 = '';
        this.operatorC = 0;
      }
      else if(this.operand1 != "")
        this.operand1 =this.operand1.slice(0,-1);
    }
  }

  allClear()
  {
    this.result = "";
    this.show = "";
    this.operand1 ="";
    this.operator1 ="";
    this.operand2 ="";
    this.operator2 ="";
    this.operatorC = 0;
  }
  binaryClear()
  {
    this.result = "";
    this.show = "";
    this.operand1 ="";
    this.operator1 ="";
    this.operand2 ="";
  }
  unaryClear()
  {
    this.result = "";
    this.show = "";
    this.operator2 ="";
    this.operand2 ="";
  }

  getAnswer()
  {
    //Unary (d1 = val , r1 = val)
    if(this.operand1 != '' && this.operator1 != '' && this.operand2 == '' && this.operator2 == ''
      && (this.operator1 == "N" || this.operator1 == "S" || this.operator1 == "V" || this.operator1 =="R" ))
    {
        this.input = this.operand1 + " " + this.operator1 + " ";
        this.server.send(this.input).subscribe
      (
        {
          next: (value) =>
          {
            this.allClear();
            this.result = value;
          },
          error: (error: HttpErrorResponse) =>
          {
            alert(error.message);
          }
        }
      )
    }
    //Binary (d1 = val , r1 = val , d2 = val)
    else if(this.operand1 != '' && this.operator1 != '' && this.operand2 != '' && this.operator2 == ''
            && (this.operator1 == "-" || this.operator1 == "+" || this.operator1 == "*" || this.operator1 =="/" ))
    {
      if(this.operand2 == "0" && this.operator1 == "/")
      {
        this.allClear();
        this.result = "E";
      }
      else
      {
        this.input = this.operand1 + " " + this.operator1 + " " + this.operand2;
      this.server.send(this.input).subscribe
     (
      {
        next: (value) =>
        {
          this.allClear();
          this.result = value;
        },
        error: (error: HttpErrorResponse) =>
        {
          alert(error.message);
        }
      }
    )
      }
    }
    //Binary-Unary
    else if(this.operand1 != '' && this.operator1 != '' && this.operand2 != '' && this.operator2 != ''
           && (this.operator1 == "-" || this.operator1 == "+" || this.operator1 == "*" || this.operator1 =="/" )
           && (this.operator2 == "N" || this.operator2 == "S" || this.operator2 == "V" || this.operator2 =="R" ))
    {
      if((this.operator2 == "N" && this.operand2 == "0") || (this.operand2 == "0" && this.operator1 =="/"))
      {
        this.allClear();
        this.result = "E";
      }
      else if (this.operand2 == "0")
      {
        this.input = this.operand1 + " " + this.operator1 + " " + this.operand2;
        this.server.send(this.input).subscribe
       (
        {
          next: (value) =>
          {
            this.allClear();
            this.result = value;
          },
          error: (error: HttpErrorResponse) =>
          {
            alert(error.message);
          }
        }
      )
      }
      else
      {
        this.input = this.operand2 + " " + this.operator2 + " ";
      this.server.send(this.input).subscribe
      (
       {
         next: (value) =>
         {
           this.unaryClear();
           this.result = value;
           this.operand2 = value;
           this.show = this.operand1 + this.operator1 + this.operand2;
           this.operatorC = 1;
         },
         error: (error: HttpErrorResponse) =>
         {
           alert(error.message);
         }
       }
      )

      }
    }
    //Binary-Binary
    else if(this.operand1 != '' && this.operator1 != '' && this.operand2 != '' && this.operator2 != ''
           && (this.operator1 == "-" || this.operator1 == "+" || this.operator1 == "*" || this.operator1 =="/" )
           && (this.operator2 == "-" || this.operator2 == "+" || this.operator2 == "*" || this.operator2 =="/" ))
    {
      if(this.operand2 == "0" && this.operator1 == "/")
      {
        this.allClear();
        this.result = "E";
      }
      else
      {
        this.input = this.operand1 + " " + this.operator1 + " " + this.operand2;
        this.server.send(this.input).subscribe
        (
         {
           next: (value) =>
           {
             this.binaryClear();
             this.result = value;
             this.operand1 = value;
             this.operator1 = this.operator2;
             this.operator2 = '';
             this.show = this.operand1 + this.operator1;
             this.operatorC = 1;
           },
           error: (error: HttpErrorResponse) =>
           {
             alert(error.message);
           }
         }
        )

      }
    }
    // % operation
    else if (this.operand1 != '' && this.operator1 != '' && this.operand2 != '' && this.operator2 != ''
    && (this.operator1 == "-" || this.operator1 == "+" || this.operator1 == "*" || this.operator1 =="/" )
    && this.operator2 == '%')
    {
      this.input = this.operand1 + " " + this.operator2 + " " + this.operand2;
      this.server.send(this.input).subscribe
      (
       {
         next: (value) =>
         {
          this.unaryClear();
          this.result = value;
          this.operand2 = value;
          this.show = this.operand1 + this.operator1 + this.operand2;
          this.operatorC = 1;
         },
         error: (error: HttpErrorResponse) =>
         {
           alert(error.message);
         }
       }
      )

    }

  }
  }




