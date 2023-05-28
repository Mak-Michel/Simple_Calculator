package com.example.demo.Calculator;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {
    public String Operate (String input) {
        System.out.println(input);
        input = input.trim();
        String[] exp = input.split(" ", 0);
            switch (exp[1])
            {
                case "+":
                    return Double.toString(Double.parseDouble(exp[0]) + Double.parseDouble(exp[2]));
                case "-":
                    return Double.toString(Double.parseDouble(exp[0]) - Double.parseDouble(exp[2]));
                case "*":
                    return Double.toString(Double.parseDouble(exp[0]) * Double.parseDouble(exp[2]));
                case "/":
                    if(Double.parseDouble(exp[2]) == 0)
                        return "E";
                    else
                        return Double.toString(Double.parseDouble(exp[0]) / Double.parseDouble(exp[2]));
                case"%":
                    return Double.toString(Double.parseDouble(exp[0])*Double.parseDouble(exp[2])/100);
                case "N":
                    if (Double.parseDouble(exp[0]) == 0)
                        return "E";
                    else
                    {
                        double x = 1 / Double.parseDouble(exp[0]);
                        return Double.toString(x);
                    }
                case "S":
                    return Double.toString(Double.parseDouble(exp[0]) * Double.parseDouble(exp[0]));
                case "R":
                    if (Double.parseDouble(exp[0]) < 0)
                        return "E";
                    else {
                        double x = Math.sqrt(Double.parseDouble(exp[0]));
                        return Double.toString(x);
                    }
                case "V":
                    double x = Double.parseDouble(exp[0]) * (-1);
                    return Double.toString(x);
                default:
                    return "E";
            }
    }
}
