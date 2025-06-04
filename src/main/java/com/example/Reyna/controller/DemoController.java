package com.example.Reyna.Demo;

import com.example.Reyna.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Reyna.Service.ServiceUser;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class DemoController {

    @Autowired
    private ServiceUser serviceUser;

    @PostMapping(value = "/user/create")
    public ResponseEntity<RequestResponse> register(@RequestBody User user)
    {
        RequestResponse requestResponse = new RequestResponse();
        requestResponse.setMessage("Usuario creado con éxito");
        requestResponse.setData(serviceUser.saveUser(user));
        return ResponseEntity.ok(requestResponse);
    }

    @PostMapping(value = "/user/login")
    public ResponseEntity<RequestResponse> login(@RequestParam String correo, @RequestParam String password)
    {
        User user = new User();

        user = serviceUser.login(correo, password);
        RequestResponse requestResponse = new RequestResponse();
        if(user != null){
            requestResponse.setMessage("Usuario Logeado con ñ");
            requestResponse.setData(user);
            return ResponseEntity.ok(requestResponse);
        } else {
            requestResponse.setMessage("Credenciales invalidas se eñeñisaron");
            return ResponseEntity.status(401).body(requestResponse);
        }
    }
}
