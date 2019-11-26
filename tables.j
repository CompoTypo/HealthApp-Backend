### FRONTEND

User() {
	private String uid;
	private String firstname;
	private String lastname;
	private String uname;
	private String email;
    private Date dob;
	private String sex;
	private String race;
    private boolean isDoctor;
    private PatientData pd; // !!  optional, constructs safe invalid object by default
    private MdData md; // !!  optional, constructs safe invalid object by default   
}

Dates() {
    private
}

MdData() {
    private String degree;
    ArrayList<String> credentials;
	private String specialty;
    private ArrayList<PatientData> patients;
}

PatientData() {
    private double height; // In Inches
	private double weight; // In Pounds
	private double bmi;
	private ArrayList<DoctorData> doctors;
    private ArrayList<Message> msgs;
	private ArrayList<VitalsData> vitalsReadings;
    private ArrayList<Bp> bpReadings;
}

public class VitalsData {
	private float temp;
	private float weight;
    private Date vitalsTaken;
}

public class Bp {
	private int sys;
	private int dia;
    private int pulse;
    private Date bpTaken;
}