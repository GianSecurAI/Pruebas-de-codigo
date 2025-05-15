package com.example.Reyna.Demo;

import com.example.Reyna.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
        requestResponse.setMessage("User created");
        requestResponse.setData(serviceUser.saveUser(user));
        return ResponseEntity.ok(requestResponse);
    }
}
