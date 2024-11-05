package com.revature.P1;

import com.revature.models.*;
import com.revature.models.DTOs.*;
import com.revature.daos.*;
import com.revature.services.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class P1ApplicationTests {

	@Test
	void contextLoads() {
	}

	//TestRestTemplate test for our ReimbursementController------------------------------------

	//RestTemplate lets us send HTTP requests FROM OUR JAVA SERVER
	//TestRestTemplate is a subclass that we can use for Testing

	@Test
	public void testInsertReimbursement(){

		//Instantiate a new TestRestTemplate object
		TestRestTemplate restTemplate = new TestRestTemplate();

		//Create a new ReimbursementDTO to use in our test
		ReimbursementDTO reimbursementDTO = new ReimbursementDTO("Test Reimbursement",10, "Pending", 1);

		//Send a POST request to /pets and save the returned Reimbursement to run our tests on
		//{verb}ForObject  //URL, Request Body, Response Type
		Reimbursement p = restTemplate.postForObject("http://localhost:7777/reimbursements", reimbursementDTO, Reimbursement.class);

		//basic tests, make sure our Reimbursement object came back as expected
		assertNotNull(p);
		assertNotEquals(p.getReimId(), 0);
		assertEquals(p.getDescription(), "Test Reimbursement");

		//Let's do assert on the ResponseEntity as well

		ResponseEntity<Reimbursement> response = restTemplate.postForEntity("http://localhost:7777/reimbursements", reimbursementDTO, Reimbursement.class);

		//Now we can test what status code comes back too!
		assertEquals("201 CREATED", response.getStatusCode().toString());
	}

	//HEY what if I DON'T want to send real requests that manipulate our real DB?
	//We can use MockMVC instead of TestRestTemplate

	//A Mockito test for our addPet() method in ReimbursementService----------------

	//A lot of setup first...

	//Create a mock ReimbursementDAO and mock UserDAO - fake DAO objects our Service tests will use
	@Mock
	ReimbursementDAO pDAO;
	@Mock
	UserDAO uDAO;

	//Next, we'll have a concrete ReimbursementService that we'll "spy" on.
	//This lets us run methods like verify() to make sure a method in the service method got called
	@Spy
	ReimbursementService reimbursementService = new ReimbursementService(pDAO, uDAO);

	//Concrete ReimbursementDTO and Reimbursement objects to use in our test (Reimbursement will match the DTO)
	ReimbursementDTO reimbursementDTO = new ReimbursementDTO("Test Reimbursement",10, "Pending", 1);
	Reimbursement reimbursement = new Reimbursement(0, "Test Reimbursement", 10,"Pending", null);
	//we'll leave the Reimbursement's user null just for ease of testing

	//Before each test, we want to initialize our mocks and our ReimbursementService spy
	@BeforeEach
	public void setup(){
		MockitoAnnotations.openMocks(this); //open the registered mocks in "this" test class
		reimbursementService = spy(new ReimbursementService(pDAO, uDAO));
	}

	//Finally, we can write our test
	@Test
	public void testInsertReimbursementWithMockito(){

		//set up some stubbing - placeholder values that our Mocked DAOs will return
		//remember, we're not testing the DAO, we're testing that the Service does what it's meant to. Fake DAOs are fine
		when(uDAO.findById(1)).thenReturn(Optional.of(new User(1,"First", "Last", "Username","Password","employee")));
		when(pDAO.save(any(Reimbursement.class))).thenReturn(reimbursement);

		//We can do one for exception Throws too
		when(uDAO.findById(0)).thenThrow(new IllegalArgumentException("User ID cannot be zero!"));

		//Let's finally call the Service's insertPet method with our reimbursementDTO object we defined above this test
		Reimbursement returnedReimbursement = reimbursementService.addReimbursement(reimbursementDTO);

		//Now, we can verify that the methods in question got called
		verify(uDAO, times(1)).findById(1);
		verify(pDAO, times(1)).save(any(Reimbursement.class));

		//And we can assert that the Reimbursement object is as expected
		assertNotNull(returnedReimbursement);
		assertEquals(returnedReimbursement.getDescription(), "Test Reimbursement");

	}

}