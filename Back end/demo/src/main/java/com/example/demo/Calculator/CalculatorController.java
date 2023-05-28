package com.example.demo.Calculator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CalculatorController {

    private final CalculatorService calculatorService ;

    @Autowired
    public CalculatorController(CalculatorService calculatorService)
    {
        this.calculatorService = calculatorService;
    }

    @RequestMapping (value="/Operate", method = RequestMethod.POST)
    public String calculating (@RequestBody String input)
    {
        return calculatorService.Operate(input);
    }
}
