import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../shared/interface/user';
import NavBar from '../../components/NavBar/NavBar';

const UserProfile = () => {
    let [userProfile, setUserProfile] = useState<IUser>({
        result: {
            firstName: '',
            lastName: '',

            gender: '',
            phoneNumber: '',
            stateOfOrigin: '',
            age: 0,
            interests: [''],
            level: 0,
            location: '',
            _id: '',
            createdAt: '',
            updatedAt: '',
            compatibilityScore: '',
            bio: '',
            socialStats: '',
            roomTemperature: '',
            visitorTolerance: '',
            country: '',
            course: '',
            genderinclusion: '',
            sportChoice: '',
            campusBudget: '',
            campusPreference: '',
        },
    });
    const [processingUpdate, setProcessingUpdate] = useState(false);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const config = {
            headers: {
                'auth-token': localStorage.getItem('token'),
            },
        };
        try {
            const response = await axios.get(baseUrl + 'find/whoami', config);

            if (response.status === 200) {
                setUserProfile(response.data);
                // console.log(userProfile);
            }
        } catch (error: any) {
            toast('Login to continue');
            navigate('/login');

            // console.log(error.response.status);
        }
    };

    const baseUrl: string  ='https://room-my-rommie-service.onrender.com/api/v1/user/'; 

    useEffect(() => {
        fetchUserData();
    }, []);

    let interestsArray: any[] = [];
    const activities = [
        'animals',

        'astrology',

        'anime',

        'art',

        'books',

        'travel',

        'fashion',

        'fitness',

        'food',

        'gaming',

        'kpop',

        'lgbt',

        'makeup',

        'manga',

        'movies',

        'music',

        'science',

        'sjw',

        'sports',

        'outdoors',

        'party',

        'philosophy',

        'plants',

        'tech',

        'travel',

        'weed',
    ];

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setUserProfile((prevData) => ({
            ...prevData,
            result: { ...prevData.result, [name]: value },
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // // ... submit to API or something

        doUpdate(userProfile);
    };

    const handleInputChange = (event: any) => {
        const { name } = event.target;
        let selectedOptions: any[];

        selectedOptions = Array.from(
            event.target.selectedOptions,
            (option: any) => option.value
        );

        setUserProfile((prevData) => ({
            ...prevData,
            result: { ...prevData.result, [name]: selectedOptions },
        }));
    };

    const doUpdate = async (data: any) => {
        console.log(interestsArray + 'here');

        const config = {
            headers: {
                'auth-token': localStorage.getItem('token'),
            },
        };
        try {
            const response = await axios.put(
                baseUrl + 'update',
                userProfile.result,
                config
            );

            if (response.status === 200) {
                let updatedProfile = {
                    result: response.data.msg,
                };
                setUserProfile(updatedProfile);
                toast('Updated Successfully');
            }

            setProcessingUpdate(false);
        } catch (error: any) {
            toast(error.response.data.msg);
            navigate('/login');
            console.log(error);
            setProcessingUpdate(false);
        }
    };
    return (
        <>
            <NavBar token={localStorage.getItem('token')}></NavBar>

            <div className=" d-flex justify-content-center">
                {/* <MultiSelect
                    value={selectedActivities}
                    onChange={(e) => setSelectedActivities(e.value)}
                    options={activities}
                    display="chip"
                    placeholder="Select activities"
                    maxSelectedLabels={5}
                    className="w-full md:w-20rem"
                    inline={false}
                    selectionLimit={4}
                    showSelectAll={false}
                /> */}
            </div>
            <section className="">
                <p className="h3 text-center mt-5">RoommateFinder - Profile</p>

                <section className="text-center my-2 lead" id="about">
                    <p>
                        {' '}
                        Update your RoommateFinder profile or delete your
                        account.
                    </p>
                </section>
                {/* <hr className="w-100"></hr> */}
                <div className="m-5">
                    <form id="profileForm" onSubmit={handleSubmit}>
                        <p className="h4 text-center mt-4 mb-1">
                            Match Listing
                        </p>
                        <p className="text-danger text-center small m-0 p-0">
                            This information will be shown to other matches
                        </p>

                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                <p className="m-0 p-0">Phone number</p>
                                <p className="text-info text-center small m-0 p-0">
                                    phone number
                                </p>
                            </span>
                            <input
                                className="col mx-4 mx-sm-0 form-control d-inline"
                                type="text"
                                name="phoneNumber"
                                value={userProfile?.result.phoneNumber}
                                onChange={handleChange}
                            />
                        </label>

                        {/* <hr className="d-md-none d-block w-50 my-0" /> */}
                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                <p className="m-0 p-0">
                                    Write a small bio to introduce yourself to
                                    other matches
                                </p>
                                <p className="text-info small m-0 p-0">
                                    Suggested: 75-125 words
                                </p>
                                <p className="text-center small text-success">
                                    Current word count:{' '}
                                    <span id="bioCount">0</span>
                                    /150 Max
                                </p>
                            </span>
                            <textarea
                                className="col mx-4 mx-sm-0 w-0 form-control d-inline"
                                id="bioText"
                                name="bio"
                                value={userProfile?.result.bio}
                                onChange={handleChange}
                            ></textarea>
                        </label>
                        <p className="h4 text-center mt-4 mb-1">
                            Basic Demographics
                        </p>

                        <label
                            className="row custom-form-row no-height"
                            id="f-country"
                        >
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                Which country are you coming from?
                            </span>
                            <select
                                className="col mx-4 mx-sm-0 form-control"
                                name="country"
                                value={userProfile?.result.country}
                                onChange={handleChange}
                            >
                                <option> -- select -- </option>
                                <option value="Afganistan">Afghanistan</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">
                                    American Samoa
                                </option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antigua &amp; Barbuda">
                                    Antigua &amp; Barbuda
                                </option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bonaire">Bonaire</option>
                                <option value="Bosnia &amp; Herzegovina">
                                    Bosnia &amp; Herzegovina
                                </option>
                                <option value="Botswana">Botswana</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Ter">
                                    British Indian Ocean Ter
                                </option>
                                <option value="Brunei">Brunei</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">
                                    Burkina Faso
                                </option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Canary Islands">
                                    Canary Islands
                                </option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">
                                    Cayman Islands
                                </option>
                                <option value="Central African Republic">
                                    Central African Republic
                                </option>
                                <option value="Chad">Chad</option>
                                <option value="Channel Islands">
                                    Channel Islands
                                </option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">
                                    Christmas Island
                                </option>
                                <option value="Cocos Island">
                                    Cocos Island
                                </option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Cook Islands">
                                    Cook Islands
                                </option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote DIvoire">
                                    Cote DIvoire
                                </option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Curaco">Curacao</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">
                                    Czech Republic
                                </option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">
                                    Dominican Republic
                                </option>
                                <option value="East Timor">East Timor</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">
                                    Equatorial Guinea
                                </option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands">
                                    Falkland Islands
                                </option>
                                <option value="Faroe Islands">
                                    Faroe Islands
                                </option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">
                                    French Guiana
                                </option>
                                <option value="French Polynesia">
                                    French Polynesia
                                </option>
                                <option value="French Southern Ter">
                                    French Southern Ter
                                </option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Great Britain">
                                    Great Britain
                                </option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="India">India</option>
                                <option value="Iran">Iran</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea North">Korea North</option>
                                <option value="Korea Sout">Korea South</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Liechtenstein">
                                    Liechtenstein
                                </option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macau">Macau</option>
                                <option value="Macedonia">Macedonia</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">
                                    Marshall Islands
                                </option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Midway Islands">
                                    Midway Islands
                                </option>
                                <option value="Moldova">Moldova</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Nambia">Nambia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherland Antilles">
                                    Netherland Antilles
                                </option>
                                <option value="Netherlands">
                                    Netherlands (Holland, Europe)
                                </option>
                                <option value="Nevis">Nevis</option>
                                <option value="New Caledonia">
                                    New Caledonia
                                </option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">
                                    Norfolk Island
                                </option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau Island">
                                    Palau Island
                                </option>
                                <option value="Palestine">Palestine</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">
                                    Papua New Guinea
                                </option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Phillipines">Philippines</option>
                                <option value="Pitcairn Island">
                                    Pitcairn Island
                                </option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Republic of Montenegro">
                                    Republic of Montenegro
                                </option>
                                <option value="Republic of Serbia">
                                    Republic of Serbia
                                </option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russia">Russia</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="St Barthelemy">
                                    St Barthelemy
                                </option>
                                <option value="St Eustatius">
                                    St Eustatius
                                </option>
                                <option value="St Helena">St Helena</option>
                                <option value="St Kitts-Nevis">
                                    St Kitts-Nevis
                                </option>
                                <option value="St Lucia">St Lucia</option>
                                <option value="St Maarten">St Maarten</option>
                                <option value="St Pierre &amp; Miquelon">
                                    St Pierre &amp; Miquelon
                                </option>
                                <option value="St Vincent &amp; Grenadines">
                                    St Vincent &amp; Grenadines
                                </option>
                                <option value="Saipan">Saipan</option>
                                <option value="Samoa">Samoa</option>
                                <option value="Samoa American">
                                    Samoa American
                                </option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome &amp; Principe">
                                    Sao Tome &amp; Principe
                                </option>
                                <option value="Saudi Arabia">
                                    Saudi Arabia
                                </option>
                                <option value="Senegal">Senegal</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">
                                    Sierra Leone
                                </option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">
                                    Solomon Islands
                                </option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">
                                    South Africa
                                </option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syria">Syria</option>
                                <option value="Tahiti">Tahiti</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad &amp; Tobago">
                                    Trinidad &amp; Tobago
                                </option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">
                                    Turkmenistan
                                </option>
                                <option value="Turks &amp; Caicos Is">
                                    Turks &amp; Caicos Is
                                </option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="United Kingdom">
                                    United Kingdom
                                </option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Erimates">
                                    United Arab Emirates
                                </option>
                                <option value="United States">
                                    United States
                                </option>
                                <option value="Uraguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Vatican City State">
                                    Vatican City State
                                </option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Virgin Islands (Brit)">
                                    Virgin Islands (Brit)
                                </option>
                                <option value="Virgin Islands (USA)">
                                    Virgin Islands (USA)
                                </option>
                                <option value="Wake Island">Wake Island</option>
                                <option value="Wallis &amp; Futana Is">
                                    Wallis &amp; Futana Is
                                </option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zaire">Zaire</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                        </label>

                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                <p className="m-0 p-0">
                                    How would you describe yourself socially?
                                </p>
                            </span>
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="socialStats"
                                            value="extrovert"
                                            checked={
                                                userProfile?.result
                                                    .socialStats === 'extrovert'
                                            }
                                            onChange={handleChange}
                                        />
                                        Extrovert
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="socialStats"
                                            value="ambivert"
                                            checked={
                                                userProfile?.result
                                                    .socialStats === 'ambivert'
                                            }
                                            onChange={handleChange}
                                        />
                                        Ambivert
                                    </label>
                                </div>

                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="socialStats"
                                            value="introvert"
                                            checked={
                                                userProfile?.result
                                                    .socialStats === 'introvert'
                                            }
                                            onChange={handleChange}
                                        />
                                        Introvert
                                    </label>
                                </div>
                            </span>
                        </label>

                        {/* <hr className="d-md-none d-block w-50 my-0" /> */}
                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                <p className="m-0 p-0">
                                    What is your intended major?
                                </p>
                            </span>
                            <select
                                className="col mx-4 mx-sm-0 form-control"
                                name="course"
                                onChange={handleChange}
                                value={userProfile?.result.course}
                            >
                                <option disabled> -- select -- </option>

                                <option value="Undecided">Undecided</option>
                                <option value="art">Art/Music</option>
                                <option value="bio">Bio/Environmental</option>
                                <option value="business">Business</option>
                                <option value="cs">CS/CE/CS-related</option>
                                <option value="engineering">Engineering</option>
                                <option value="Health science">
                                    Health Science
                                </option>
                                <option value="language">Language</option>
                                <option value="math">Math</option>
                                <option value="physics">
                                    Physical Science
                                </option>
                                <option value="social science">
                                    Social Science
                                </option>
                            </select>
                        </label>
                        <p className="h4 text-center mt-4 mb-1">
                            Housing Preferences
                        </p>
                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                What is your preferred campus location?
                            </span>
                            <select
                                className="col mx-4 mx-sm-0 form-control"
                                name="campusPreference"
                                onChange={handleChange}
                            >
                                <option disabled> -- select -- </option>
                                <option value="oncamp">ON-Campus</option>
                                <option value="offcamp">Off-campus</option>
                            </select>
                        </label>
                        {/* <hr className="d-md-none d-block w-50 my-0" /> */}
                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                What is your preferred ON-Campus Hostel?
                            </span>
                            <select
                                className="col mx-4 mx-sm-0 form-control"
                                name="campusBudget"
                                value={userProfile.result.campusBudget}
                                onChange={handleChange}
                            >
                                <option disabled> -- select -- </option>
                                <option value="Unsure">Unsure</option>

                                <option value="Boys Hostel A">
                                    Boys Hostel A = 130,000 Naira{' '}
                                </option>
                                <option value="Boys Hostel B">
                                    Boys Hostel B = 130,000 Naira
                                </option>
                                <option value="Boys Hostel C">
                                    Boys Hostel C = 130,000 Naira
                                </option>
                                <option value="Boys Hostel D">
                                    Boys Hostel D = 130,000 Naira
                                </option>
                                <option value="Boys Hostel E">
                                    Boys Hostel E = 130,000 Naira
                                </option>
                                <option value="Boys Hostel F">
                                    Boys Hostel F = 130,000 Naira
                                </option>
                                <option value="Boys Hostel G">
                                    Boys Hostel G = 130,000 Naira
                                </option>
                                <option value="Boys Hostel H">
                                    Boys Hostel H = 130,000 Naira
                                </option>
                                <option value="Boys Hostel I">
                                    Boys Hostel I = 130,000 Naira
                                </option>
                                <option value="Boys Hostel J">
                                    Boys Hostel J = 130,000 Naira
                                </option>
                                <option value="Boys Hostel K">
                                    Boys Hostel K = 160,000 Naira
                                </option>
                                <option value="Boys Hostel L">
                                    Boys Hostel L = 180,000 Naira
                                </option>
                                <option value="Boys Hostel M">
                                    Boys Hostel M = 230,000 Naira
                                </option>
                                <option value="Girls Stanzel Hostel ">
                                    Girls Stanzel Hostel = 160,000 Naira
                                </option>
                                <option value="Girls CICL Hostel">
                                    Girls CICL Hostel = 180,000{' '}
                                </option>
                                <option value="Girls PA ETO Hostel">
                                    Girls PA ETO Hostel = 250,000 Naira
                                </option>
                            </select>
                        </label>
                        {/* <hr className="d-md-none d-block w-50 my-0" /> */}
                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                What is your ideal room temperature?
                            </span>
                            <select
                                className="col mx-4 mx-sm-0 form-control"
                                name="roomTemperature"
                                value={userProfile?.result.roomTemperature}
                                onChange={handleChange}
                            >
                                <option selected value="">
                                    {' '}
                                    -- select --{' '}
                                </option>
                                <option value="Cold">
                                    Cold (Less than 17 °C/63 °F){' '}
                                </option>
                                <option value="Cool">
                                    Cool (17-20 °C/63-68 °F)
                                </option>
                                <option value="Neutral">
                                    Neutral (20-23 °C/68-73 °F)
                                </option>
                                <option value="Warm">
                                    Warm (23-26 °C/73-78 °F)
                                </option>
                                <option value="Hot">
                                    Hot (More than 26 °C/78 °F)
                                </option>
                            </select>
                        </label>

                        {/* <hr className="d-md-none d-block w-50 my-0" /> */}
                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                Are you okay with living in a Gender Inclusive
                                room?
                                <p className="text-info small m-0 p-0">
                                    For more information, see{' '}
                                    <a href="https://hfs.uw.edu/Gender-inclusive-housing">
                                        the UW HFS website
                                    </a>
                                    .
                                </p>
                            </span>
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="genderinclusion"
                                            value="true"
                                            checked={
                                                userProfile?.result
                                                    .genderinclusion === 'true'
                                            }
                                            onChange={handleChange}
                                        />
                                        Yes
                                    </label>
                                </div>
                                <div className="form-check-inline">
                                    <label className="form-check-label">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="genderinclusion"
                                            value="false"
                                            checked={
                                                userProfile?.result
                                                    .genderinclusion === 'false'
                                            }
                                            onChange={handleChange}
                                        />
                                        No
                                    </label>
                                </div>
                            </span>
                        </label>

                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                <p className="m-0 p-0">
                                    How often can you tolerate visitors?
                                </p>
                            </span>
                            <select
                                className="col mx-4 mx-sm-0 form-control"
                                name="visitorTolerance"
                                value={userProfile.result.visitorTolerance}
                                onChange={handleChange}
                            >
                                <option disabled> -- select -- </option>
                                <option value="few">
                                    I'm a CS major so as few as possible
                                </option>
                                <option value="occasionally">
                                    Occasionally is okay
                                </option>
                                <option value="frequent">
                                    All the time is fine with me!
                                </option>
                            </select>
                        </label>

                        <p className="h4 text-center mt-4 mb-1">Interests</p>
                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 col-sm-12 mb-1 py-2 text-center">
                                <p className="m-0 p-0">
                                    If you plan to play a varsity sport, what is
                                    it?
                                </p>
                            </span>
                            <select
                                className="col mx-4 mx-sm-0 form-control"
                                name="sportChoice"
                                value={userProfile.result.sportChoice}
                                onChange={handleChange}
                            >
                                <option disabled> -- select -- </option>
                                <option value="None">None</option>

                                <option value="MBaseball">
                                    Men's Baseball
                                </option>
                                <option value="MBasketball">
                                    Men's Basketball
                                </option>
                                <option value="MCrossCountry">
                                    Men's Cross Country
                                </option>
                                <option value="MFootball">
                                    Men's Football
                                </option>
                                <option value="MGolf">Men's Golf</option>
                                <option value="MRowing">Men's Rowing</option>
                                <option value="MSoccer">Men's Soccer</option>
                                <option value="MTennis">Men's Tennis</option>
                                <option value="MTrackAndField">
                                    Men's Track and Field
                                </option>
                                <option value="WBasketball">
                                    Women's Basketball
                                </option>
                                <option value="WBeachVolleyball">
                                    Women's Beach Volleyball
                                </option>
                                <option value="WCrossCountry">
                                    Women's Cross Country
                                </option>
                                <option value="WGolf">Women's Golf</option>
                                <option value="WGymnastics">
                                    Women's Gymnastics
                                </option>
                                <option value="WRowing">Women's Rowing</option>
                                <option value="WSoccer">Women's Soccer</option>
                                <option value="WSoftball">
                                    Women's Softball
                                </option>
                                <option value="WTennis">Women's Tennis</option>
                                <option value="WTrackAndField">
                                    Women's Track and Field
                                </option>
                                <option value="WVolleyball">
                                    Women's Volleyball
                                </option>
                            </select>
                        </label>
                        {/* <hr className="d-md-none d-block w-50 my-0" /> */}
                        <label className="row custom-form-row">
                            <span className="col-md-12 col-lg-6 mb-1 py-2 text-center ">
                                <p className="m-0 p-0">
                                    What are your extra-curricular interests?
                                </p>
                                <p className="text-info text-center small m-0 p-0">
                                    To select multiple options, hold down the
                                    Ctrl key on Windows or the Command key on
                                    Mac
                                </p>
                            </span>
                            <select
                                className="col mx-4 mx-sm-0 form-control"
                                name="interests"
                                onChange={handleInputChange}
                                multiple
                            >
                                <option disabled> -- select -- </option>

                                {activities.map((activity) => (
                                    <option
                                        key={activity}
                                        value={activity}
                                        selected={userProfile.result.interests?.includes(
                                            activity
                                        )}
                                    >
                                        {activity}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <button
                            className="btn btn-outline-success w-100 mt-5"
                            style={{ marginBottom: '60px' }}
                            type="submit"
                            disabled={processingUpdate}
                        >
                            {processingUpdate
                                ? 'Processing'
                                : 'Update Profile!'}
                        </button>
                        <p className="mt-3 text-center w-100">
                            <span id="resMsg"></span>
                        </p>
                    </form>
                </div>
            </section>

            <ToastContainer />
        </>
    );
};
export default UserProfile;
