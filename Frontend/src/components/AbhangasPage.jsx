import React, { useState } from "react";
import CustomNavbar from "./Navbar";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
  Form,
} from "react-bootstrap";
import "./AbhangasPage.css";

const AbhangasPage = () => {
  // Abhangas Data
  const [abhangas] = useState([
    {
    id: 1,
      marathi: "जाणता अजाणता हरिपाठ करा । मग तो सांगे पंथा संताचा ॥",
      meaning:
        "Whether knowingly or unknowingly, chant the name of Hari (God), and he will guide you on the path of saints.",
      theme: "Devotion",
      audio: "/जाणता अजाणता हरिपाठ(1).mp3",
    },
    {
      id: 2,
      marathi: "तिन्ही लोक आनंदाने भरुनि आले । हरी विठ्ठल नाम घेता ॥",
      meaning:
        "Chanting the name of Hari Vitthal fills all three worlds with joy.",
      theme: "Faith",
      audio: "/तिन्ही लोक आनंदाने भ(2).mp3",
    },
    {
      id: 3,
      marathi: "आनंदाचे डोही आनंद तरंग । जय जय राम कृष्ण हरी ॥",
      meaning:
        "In the ocean of bliss, waves of joy arise – Victory to Ram, Krishna, and Hari!",
      theme: "Devotion",
      audio: "/आनंदाचे डोही आनंद तर(3).mp3",
    },
    {
        id: 4,
        marathi: "आम्ही वैकुंठवासी । आलो या चि कारणासी । बोलिले जे ॠषी । साच भावे वर्तावया ॥१॥ झाडू संतांचे मारग । आडराने भरले जग ।उच्छिष्टाचा भाग । शेष उरले ते सेवू ॥धृ॥",
        meaning:
            "We are the inhabitants of Vaikuntha. We have come for this reason. The sages have spoken. Let us behave with true feelings. ||1||The path of the saints is full of fear. The world is filled withfear. The portion of the chosen one. We will serve the rest.",
        theme: "Devotion",
        audio: "/आम्ही वैकुंठवासी आलो(4).mp3",
    },
    {
        id: 5,
        marathi: "आम्ही हरिचे सवंगडे । जुने ठायीचे वेडे बागडे ।हाती धरुनी कडे । पाठीसवे वागविलो ॥१॥ म्हणोनि भिन्न भेद नाही । देवा आम्हा एकदेही । नाही जालो काही । एका एक वेगळे ॥धृ॥",
        meaning: "We are all the brothers of Hari. The old, crazy,old-fashioned ones. Holding hands. We behaved backwards. 1. Saying , there is no difference.O God, we are one body. We do not go anywhere . Weare all different . ",
        theme: "Devotion",
        audio: "/आम्ही हरिचे सवंगडे ज(5).mp3",
    },
    {
        id: 6,
        marathi: "मागे बहुता जन्मी । हे चि करित आलो आम्ही । भवतापश्रमी । दुःखे पीडिली निववू त्या ॥१॥ गर्जो हरिचे पवाडे । मिळो वैष्णव बागडे ।पाझर रोकडे । काढू पाषाणामध्ये ॥धृ॥ भाव शुध्द नामावळी । हर्षे नाचो पिटू टाळी ।घालू पाया तळी । कळिकाळ त्याबळे ॥२॥ गर्जो हरिचे पवाडे । मिळो वैष्णव बागडे ।पाझर रोकडे । काढू पाषाणामध्ये ॥धृ॥ कामक्रोध बंदखाणी । तुका म्हणे दिले दोन्ही । इंद्रियांचे धनी । आम्ही जालो गोसावी ॥३॥ गर्जो हरिचे पवाडे । मिळो वैष्णव बागडे । पाझर रोकडे । काढू पाषाणामध्ये ॥धृ॥",
        meaning: "Many births ago. We have come to do this. Weare the workers of the world. We will relieve the suffering of those who are suffering. 1.The sound of the trumpet of Hari. Let us find the Vaishnava bagade. Let us find the money. Let us extract it from the stone. The pure name of the soul. I will dance with joy and beat my hands. Let us lay the foundation. The key is in the heart. 2.The sound of the trumpet of Hari. Let us find the Vaishnava bagade. Let us find the money. Let usextract it from the stone. The prison of lust and anger. You have given me both. The lord of the senses. We have gone to Gosavi. 3. The sound of the trumpet of Hari. Let us find the Vaishnava bagade. Let us find the money. Let us extract it from the stone.",
        theme: "Faith",
        audio: "/generated-audio(6).mp3",
    },
    {
        id: 7,
        marathi: "ब्रम्हज्ञान जरी एके दिवसी कळे । तात्काळ हा गळे अभिमान ॥१॥अभिमान लागे शुकाचिये पाठी । व्यासे उपराटी दृष्टी केली ॥२॥ जनक भेटीसी पाठविला तेणे । अभिमान नाणे खोटे केले ॥३॥ खोटे करूनिया लाविला अभ्यासी । मेरु शिखरासी शुक गेला ॥४॥ जाऊनिया तेणे साधिली समाधी । तुका म्हणे तधी होतो आम्ही ॥५॥",
        meaning: "Even if the knowledge of Brahman is known one day, immediately this pride is swallowed up. 1.Pride is like a dry leaf. Vyasa has seen the other side. 2.He sent him to visit Janaka. Pride has made the coin false. 3.He has made it false and has made it a student. He has dried up on the peak of Meru. 4. He has gone to Jauniya and has attained Samadhi. We are ready to say this. 5.",
        theme: "Faith",
        audio: "/generated-audio(7).mp3",
    },
    {
        id: 8,
        marathi: "कोटी जन्म पुण्य साधन साधिले । तेणे हाता आले हरिदास्य ॥१॥ रात्रीं दिवस ध्यान हरीचे भजन । काया वाचा मन भगवंती ॥ध्रु॥ ऐसिया प्रेमळा म्हणताती वेडा । संसार रोकडा बुडविला ॥२॥ रात्रीं दिवस ध्यान हरीचे भजन । काया वाचा मन भगवंती ॥ध्रु॥ एकवीस कुळे जेणे उद्धरिली । हे तो न कळे खोली भाग्यमंदा ॥३॥ रात्रीं दिवस ध्यान हरीचे भजन । काया वाचा मन भगवंती ॥ध्रु॥ तुका म्हणे त्याची पायधुळी मिळे । भवभय पळे वंदिताची ॥४॥ रात्रीं दिवस ध्यान हरीचे भजन । काया वाचा मन भगवंती ॥ध्रु॥",
        meaning: "Attainment of crores of births and virtues. Then came Haridasya ॥1॥ Day and night meditation Hari Bhajan. What do you read mind Bhagwanti ॥ Dhru॥ Aisiya Premla is called crazy. The world has sunk in cash ॥2॥ Day and night meditation Hari Bhajan. What do you read mind Bhagwanti ॥ Dhru॥ Twenty-one clans were rescued. If he does not know this, the room is unlucky. ॥3॥ Day and night meditation Hari Bhajan. What do you read mind Bhagwanti ॥ Dhru॥ You say, get his footing. Bhavbhaya ran Vandita's ॥4॥ Day and night meditation Hari Bhajan. What do you read mind Bhagwanti ॥ Dhru॥",
        theme: "Devotion",
        audio: "/generated-audio(8).mp3",
    },
    {
        id: 9,
        marathi: "फिराविली दोन्ही । कन्या आणि चक्रपाणी ॥१॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ तुटली बंधने । वसुदेव देवकीची दर्शने ॥२॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ गोकुळासी आले । ब्रम्ह अव्यक्त चांगले ॥३॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ नंद दसवंती । धन्य देखिले श्रीपती ॥४॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ निशी जन्मकाळ । आले अष्टमी गोपाळ ॥५॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ आनंदली मही । भार गेला सकळ ही ॥६॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ तुका म्हणे कंसा । आट भोविला वळसा ॥७॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥",
        meaning: "1. Rotated both. Kanya and Chakrapani ॥1॥ Go happy happy. Incarnate Govinda. Broken bonds. Darshan of Vasudeva Devaki ॥2॥ Go happy happy. Incarnate Govinda. Gokulasi came. Brahma is unmanifest good. ॥3॥ Go happy happy. Incarnate Govinda. Nanda Daswanti. Blessed see Shripati ॥4॥ Go happy happy. Incarnate Govinda. Nishi birth period. Ale Ashtami Gopal ॥5॥ Go happy happy. Incarnate Govinda. Anandali Mahi. The burden is gone. Go happy happy. Incarnate Govinda. You say parentheses. Go round and round 7. Go happy happy. Incarnate Govinda.",
        theme: "Devotion",
        audio: "/Audio9.wav",
    },
    {
        id: 10,
        marathi: "करूनि आरती । आता ओवाळू श्रीपती ॥१॥ आजि पुरले नवस । धन्य जाला हा दिवस ॥धृ॥ पाहा वो सकळा । पुण्यवंता तुम्ही बाळा ॥२॥ आजि पुरले नवस । धन्य जाला हा दिवस ॥धृ॥ तुका वाहे टाळी । होता सन्निध जवळी ॥३॥ आजि पुरले नवस । धन्य जाला हा दिवस ॥धृ॥",
        meaning: "Karani Aarti. Now wave Shripati ॥1॥ Aji buried vows. May this day be blessed. Look, it's gross. You are a virtuous child. Aji buried vows. May this day be blessed. Clap your hands. There was proximity. 3. Aji buried vows. May this day be blessed.",
        theme: "Faith",
        audio: "/Audio10.wav",
    },
    {
        id: 11,
        marathi: "मुख डोळा पाहे । तैशीच ते उभी राहे ॥१॥ केल्याविण नव्हे हाती। धरोनि आरती परती ॥धृ॥ न धरिती मनी। काही संकोच दाटणी ॥२॥ केल्याविण नव्हे हाती। धरोनि आरती परती ॥धृ॥ तुका म्हणे देवे । ओस केल्या देहभावे ॥३॥ केल्याविण नव्हे हाती। धरोनि आरती परती ॥धृ॥",
        meaning: "The face sees the eye. That is how it stands. ॥1॥ Not done by the hand. Hold the aarti back. ॥॥ Not held by the mind. Some hesitation is not done by the hand. Hold the aarti back. ॥॥ You say to God. The body is exhausted. ॥3॥ Not done by the hand. Hold the aarti back.",
        theme: "Faith",
        audio: "/Audio11.wav",
    },
    {
        id: 12,
        marathi: "विटंबिले भट । दिला पाठीवरी पाट ॥१॥खोटे जाणोनि अंतर । न साहे चि विश्वंभर ॥धृ॥ ते चि करी दान । जैसे आइके वचन ॥२॥ खोटे जाणोनि अंतर । न साहे चि विश्वंभर ॥धृ॥ तुका म्हणे देवे । पूतना शोषियेली जीवे ॥३॥ खोटे जाणोनि अंतर । न साहे चि विश्वंभर ॥धृ॥",
        meaning: "Vitambile Bhat. He gave a pat on the back. 1. He knows the difference between the truth and the truth. He does not accept the world. He does not accept the truth. He does not accept the world. He does not accept the truth. He says to you. He who devours the soul of the soul. 3. He knows the difference between the truth and the truth. He does not accept the world. He does not accept the truth.",
        theme: "Devotion",
        audio: "/Audio12.wav",
    },
  ]);

  // State for Search, Filter & Expanded View
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("All");
  const [expandedAbhanga, setExpandedAbhanga] = useState(null);

  // Filtered Abhangas (Based on Search & Theme)
  const filteredAbhangas = abhangas.filter((abhang) => {
    const matchesSearch = abhang.marathi.includes(searchTerm);
    const matchesTheme =
      selectedTheme === "All" || abhang.theme === selectedTheme;
    return matchesSearch && matchesTheme;
  });

  // Handle "Read More" Click
  const handleReadMore = (abhang) => {
    setExpandedAbhanga(abhang);
  };

  // Close Expanded View
  const handleClose = () => {
    setExpandedAbhanga(null);
  };

  // Utility: Truncate Text (for Marathi Abhanga)
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const [currentAudio, setCurrentAudio] = useState(null);

const playAudio = (audioSrc) => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0; // Reset
  }
  const audio = new Audio(audioSrc);
  setCurrentAudio(audio);
  audio.play();
};


<Button variant="warning" onClick={() => playAudio(abhang.audio)}>
🎵 Listen
</Button>



  return (
    <div>
      {/* Imported Navbar */}
      <CustomNavbar />
      {/* Hero Section */}
      <section className="hero-section text-center">
        <Container>
          <h1 className="hero-title">Explore the Divine Abhangas</h1>
          <p className="hero-text">
            Dive into the timeless wisdom of Sant Tukaram Maharaj's Abhangas.
          </p>
        </Container>
      </section>

      {/* Filter Section */}
      <Container className="filter-section my-4">
        <Row className="justify-content-between">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search Abhangas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
            >
              <option value="All">All Themes</option>
              <option value="Devotion">Devotion</option>
              <option value="Faith">Faith</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>

      {/* Abhanga Collection */}
      <section className="abhang-collection">
        <Container>
          <Row>
            {expandedAbhanga ? (
              <Col md={12} className="expanded-abhanga">
                <Card className="abhang-card expanded-card">
                  <Card.Body>
                    <blockquote className="abhang-text">
                      {expandedAbhanga.marathi}
                    </blockquote>
                    <p className="abhang-meaning">{expandedAbhanga.meaning}</p>
                    <Button
                      variant="warning"
                      onClick={() =>
                        new Audio(expandedAbhanga.audio).play()
                      }
                    >
                      🎵 Listen
                    </Button>
                    <Button
                      variant="danger"
                      className="close-btn"
                      onClick={handleClose}
                    >
                      ✖ Close
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              filteredAbhangas.map((abhang) => (
                <Col key={abhang.id} md={6} lg={4} className="mb-4">
                  <Card className="abhang-card h-100">
                    <Card.Body>
                      <blockquote className="abhang-text">
                        {truncateText(abhang.marathi, 120)}
                      </blockquote>
                      <Button
                        variant="warning"
                        onClick={() => new Audio(abhang.audio).play()}
                      >
                        🎵 Listen
                      </Button>
                      <Button
                        variant="link"
                        className="read-more"
                        onClick={() => handleReadMore(abhang)}
                      >
                        Read More
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer text-center">
        <Container>
          <p>
            &copy; {new Date().getFullYear()} Sant Tukaram Maharaj | All Rights
            Reserved
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default AbhangasPage;


// import React, { useState } from "react";
// import CustomNavbar from "./Navbar";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Form,
// } from "react-bootstrap";
// import "./AbhangasPage.css";

// const AbhangasPage = () => {
//   // Abhangas Data
//     const [abhangas] = useState([
//     {
//     id: 1,
//       marathi: "जाणता अजाणता हरिपाठ करा । मग तो सांगे पंथा संताचा ॥",
//       meaning:
//         "Whether knowingly or unknowingly, chant the name of Hari (God), and he will guide you on the path of saints.",
//       theme: "Devotion",
//       audio: "/जाणता अजाणता हरिपाठ(1).mp3",
//     },
//     {
//       id: 2,
//       marathi: "तिन्ही लोक आनंदाने भरुनि आले । हरी विठ्ठल नाम घेता ॥",
//       meaning:
//         "Chanting the name of Hari Vitthal fills all three worlds with joy.",
//       theme: "Faith",
//       audio: "/तिन्ही लोक आनंदाने भ(2).mp3",
//     },
//     {
//       id: 3,
//       marathi: "आनंदाचे डोही आनंद तरंग । जय जय राम कृष्ण हरी ॥",
//       meaning:
//         "In the ocean of bliss, waves of joy arise – Victory to Ram, Krishna, and Hari!",
//       theme: "Devotion",
//       audio: "/आनंदाचे डोही आनंद तर(3).mp3",
//     },
//     {
//         id: 4,
//         marathi: "आम्ही वैकुंठवासी । आलो या चि कारणासी । बोलिले जे ॠषी । साच भावे वर्तावया ॥१॥ झाडू संतांचे मारग । आडराने भरले जग ।उच्छिष्टाचा भाग । शेष उरले ते सेवू ॥धृ॥",
//         meaning:
//             "We are the inhabitants of Vaikuntha. We have come for this reason. The sages have spoken. Let us behave with true feelings. ||1||The path of the saints is full of fear. The world is filled withfear. The portion of the chosen one. We will serve the rest.",
//         theme: "Devotion",
//         audio: "/आम्ही वैकुंठवासी आलो(4).mp3",
//     },
//     {
//         id: 5,
//         marathi: "आम्ही हरिचे सवंगडे । जुने ठायीचे वेडे बागडे ।हाती धरुनी कडे । पाठीसवे वागविलो ॥१॥ म्हणोनि भिन्न भेद नाही । देवा आम्हा एकदेही । नाही जालो काही । एका एक वेगळे ॥धृ॥",
//         meaning: "We are all the brothers of Hari. The old, crazy,old-fashioned ones. Holding hands. We behaved backwards. 1. Saying , there is no difference.O God, we are one body. We do not go anywhere . Weare all different . ",
//         theme: "Devotion",
//         audio: "/आम्ही हरिचे सवंगडे ज(5).mp3",
//     },
//     {
//         id: 6,
//         marathi: "मागे बहुता जन्मी । हे चि करित आलो आम्ही । भवतापश्रमी । दुःखे पीडिली निववू त्या ॥१॥ गर्जो हरिचे पवाडे । मिळो वैष्णव बागडे ।पाझर रोकडे । काढू पाषाणामध्ये ॥धृ॥ भाव शुध्द नामावळी । हर्षे नाचो पिटू टाळी ।घालू पाया तळी । कळिकाळ त्याबळे ॥२॥ गर्जो हरिचे पवाडे । मिळो वैष्णव बागडे ।पाझर रोकडे । काढू पाषाणामध्ये ॥धृ॥ कामक्रोध बंदखाणी । तुका म्हणे दिले दोन्ही । इंद्रियांचे धनी । आम्ही जालो गोसावी ॥३॥ गर्जो हरिचे पवाडे । मिळो वैष्णव बागडे । पाझर रोकडे । काढू पाषाणामध्ये ॥धृ॥",
//         meaning: "Many births ago. We have come to do this. Weare the workers of the world. We will relieve the suffering of those who are suffering. 1.The sound of the trumpet of Hari. Let us find the Vaishnava bagade. Let us find the money. Let us extract it from the stone. The pure name of the soul. I will dance with joy and beat my hands. Let us lay the foundation. The key is in the heart. 2.The sound of the trumpet of Hari. Let us find the Vaishnava bagade. Let us find the money. Let usextract it from the stone. The prison of lust and anger. You have given me both. The lord of the senses. We have gone to Gosavi. 3. The sound of the trumpet of Hari. Let us find the Vaishnava bagade. Let us find the money. Let us extract it from the stone.",
//         theme: "Faith",
//         audio: "/generated-audio(6).mp3",
//     },
//     {
//         id: 7,
//         marathi: "ब्रम्हज्ञान जरी एके दिवसी कळे । तात्काळ हा गळे अभिमान ॥१॥अभिमान लागे शुकाचिये पाठी । व्यासे उपराटी दृष्टी केली ॥२॥ जनक भेटीसी पाठविला तेणे । अभिमान नाणे खोटे केले ॥३॥ खोटे करूनिया लाविला अभ्यासी । मेरु शिखरासी शुक गेला ॥४॥ जाऊनिया तेणे साधिली समाधी । तुका म्हणे तधी होतो आम्ही ॥५॥",
//         meaning: "Even if the knowledge of Brahman is known one day, immediately this pride is swallowed up. 1.Pride is like a dry leaf. Vyasa has seen the other side. 2.He sent him to visit Janaka. Pride has made the coin false. 3.He has made it false and has made it a student. He has dried up on the peak of Meru. 4. He has gone to Jauniya and has attained Samadhi. We are ready to say this. 5.",
//         theme: "Faith",
//         audio: "/generated-audio(7).mp3",
//     },
//     {
//         id: 8,
//         marathi: "कोटी जन्म पुण्य साधन साधिले । तेणे हाता आले हरिदास्य ॥१॥ रात्रीं दिवस ध्यान हरीचे भजन । काया वाचा मन भगवंती ॥ध्रु॥ ऐसिया प्रेमळा म्हणताती वेडा । संसार रोकडा बुडविला ॥२॥ रात्रीं दिवस ध्यान हरीचे भजन । काया वाचा मन भगवंती ॥ध्रु॥ एकवीस कुळे जेणे उद्धरिली । हे तो न कळे खोली भाग्यमंदा ॥३॥ रात्रीं दिवस ध्यान हरीचे भजन । काया वाचा मन भगवंती ॥ध्रु॥ तुका म्हणे त्याची पायधुळी मिळे । भवभय पळे वंदिताची ॥४॥ रात्रीं दिवस ध्यान हरीचे भजन । काया वाचा मन भगवंती ॥ध्रु॥",
//         meaning: "Attainment of crores of births and virtues. Then came Haridasya ॥1॥ Day and night meditation Hari Bhajan. What do you read mind Bhagwanti ॥ Dhru॥ Aisiya Premla is called crazy. The world has sunk in cash ॥2॥ Day and night meditation Hari Bhajan. What do you read mind Bhagwanti ॥ Dhru॥ Twenty-one clans were rescued. If he does not know this, the room is unlucky. ॥3॥ Day and night meditation Hari Bhajan. What do you read mind Bhagwanti ॥ Dhru॥ You say, get his footing. Bhavbhaya ran Vandita's ॥4॥ Day and night meditation Hari Bhajan. What do you read mind Bhagwanti ॥ Dhru॥",
//         theme: "Devotion",
//         audio: "/generated-audio(8).mp3",
//     },
//     {
//         id: 9,
//         marathi: "फिराविली दोन्ही । कन्या आणि चक्रपाणी ॥१॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ तुटली बंधने । वसुदेव देवकीची दर्शने ॥२॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ गोकुळासी आले । ब्रम्ह अव्यक्त चांगले ॥३॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ नंद दसवंती । धन्य देखिले श्रीपती ॥४॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ निशी जन्मकाळ । आले अष्टमी गोपाळ ॥५॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ आनंदली मही । भार गेला सकळ ही ॥६॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥ तुका म्हणे कंसा । आट भोविला वळसा ॥७॥ जाला आनंदे आनंद । अवतरले गोविंद ॥धृ॥",
//         meaning: "1. Rotated both. Kanya and Chakrapani ॥1॥ Go happy happy. Incarnate Govinda. Broken bonds. Darshan of Vasudeva Devaki ॥2॥ Go happy happy. Incarnate Govinda. Gokulasi came. Brahma is unmanifest good. ॥3॥ Go happy happy. Incarnate Govinda. Nanda Daswanti. Blessed see Shripati ॥4॥ Go happy happy. Incarnate Govinda. Nishi birth period. Ale Ashtami Gopal ॥5॥ Go happy happy. Incarnate Govinda. Anandali Mahi. The burden is gone. Go happy happy. Incarnate Govinda. You say parentheses. Go round and round 7. Go happy happy. Incarnate Govinda.",
//         theme: "Devotion",
//         audio: "/Audio9.wav",
//     },
//     {
//         id: 10,
//         marathi: "करूनि आरती । आता ओवाळू श्रीपती ॥१॥ आजि पुरले नवस । धन्य जाला हा दिवस ॥धृ॥ पाहा वो सकळा । पुण्यवंता तुम्ही बाळा ॥२॥ आजि पुरले नवस । धन्य जाला हा दिवस ॥धृ॥ तुका वाहे टाळी । होता सन्निध जवळी ॥३॥ आजि पुरले नवस । धन्य जाला हा दिवस ॥धृ॥",
//         meaning: "Karani Aarti. Now wave Shripati ॥1॥ Aji buried vows. May this day be blessed. Look, it's gross. You are a virtuous child. Aji buried vows. May this day be blessed. Clap your hands. There was proximity. 3. Aji buried vows. May this day be blessed.",
//         theme: "Faith",
//         audio: "/Audio10.wav",
//     },
//     {
//         id: 11,
//         marathi: "मुख डोळा पाहे । तैशीच ते उभी राहे ॥१॥ केल्याविण नव्हे हाती। धरोनि आरती परती ॥धृ॥ न धरिती मनी। काही संकोच दाटणी ॥२॥ केल्याविण नव्हे हाती। धरोनि आरती परती ॥धृ॥ तुका म्हणे देवे । ओस केल्या देहभावे ॥३॥ केल्याविण नव्हे हाती। धरोनि आरती परती ॥धृ॥",
//         meaning: "The face sees the eye. That is how it stands. ॥1॥ Not done by the hand. Hold the aarti back. ॥॥ Not held by the mind. Some hesitation is not done by the hand. Hold the aarti back. ॥॥ You say to God. The body is exhausted. ॥3॥ Not done by the hand. Hold the aarti back.",
//         theme: "Faith",
//         audio: "/Audio11.wav",
//     },
//     {
//         id: 12,
//         marathi: "विटंबिले भट । दिला पाठीवरी पाट ॥१॥खोटे जाणोनि अंतर । न साहे चि विश्वंभर ॥धृ॥ ते चि करी दान । जैसे आइके वचन ॥२॥ खोटे जाणोनि अंतर । न साहे चि विश्वंभर ॥धृ॥ तुका म्हणे देवे । पूतना शोषियेली जीवे ॥३॥ खोटे जाणोनि अंतर । न साहे चि विश्वंभर ॥धृ॥",
//         meaning: "Vitambile Bhat. He gave a pat on the back. 1. He knows the difference between the truth and the truth. He does not accept the world. He does not accept the truth. He does not accept the world. He does not accept the truth. He says to you. He who devours the soul of the soul. 3. He knows the difference between the truth and the truth. He does not accept the world. He does not accept the truth.",
//         theme: "Devotion",
//         audio: "/Audio12.wav",
//     },
//   ]);

//   // State for Search, Filter & Expanded View
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTheme, setSelectedTheme] = useState("All");
//   const [expandedAbhanga, setExpandedAbhanga] = useState(null);
//   const audioRef = useRef(new Audio());

//   // Filtered Abhangas (Based on Search & Theme)
//   const filteredAbhangas = abhangas.filter((abhang) => {
//     const matchesSearch = abhang.marathi.includes(searchTerm);
//     const matchesTheme =
//       selectedTheme === "All" || abhang.theme === selectedTheme;
//     return matchesSearch && matchesTheme;
//   });

//   // Handle "Read More" Click
//   const handleReadMore = (abhang) => {
//     setExpandedAbhanga(abhang);
//     if (abhang.audio) {
//       audioRef.current.src = abhang.audio;
//       audioRef.current.play();
//     }
//   };

//   // Close Expanded View & Stop Audio
//   const handleClose = () => {
//     setExpandedAbhanga(null);
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0; // Reset audio position
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <CustomNavbar />

//       {/* Hero Section */}
//       <section className="hero-section text-center">
//         <Container>
//           <h1 className="hero-title">Explore the Divine Abhangas</h1>
//           <p className="hero-text">
//             Dive into the timeless wisdom of Sant Tukaram Maharaj's Abhangas.
//           </p>
//         </Container>
//       </section>

//       {/* Filter Section */}
//       <Container className="filter-section my-4">
//         <Row className="justify-content-between">
//           <Col md={4}>
//             <Form.Control
//               type="text"
//               placeholder="Search Abhangas..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </Col>
//           <Col md={4}>
//             <Form.Select
//               value={selectedTheme}
//               onChange={(e) => setSelectedTheme(e.target.value)}
//             >
//               <option value="All">All Themes</option>
//               <option value="Devotion">Devotion</option>
//               <option value="Faith">Faith</option>
//             </Form.Select>
//           </Col>
//         </Row>
//       </Container>

//       {/* Abhanga Collection */}
//       <section className="abhang-collection">
//         <Container>
//           <Row>
//             {expandedAbhanga ? (
//               // Expanded View
//               <Col md={12} className="expanded-abhanga">
//                 <Card className="abhang-card expanded-card">
//                   <Card.Body>
//                     <blockquote className="abhang-text">
//                       {expandedAbhanga.marathi}
//                     </blockquote>
//                     <p className="abhang-meaning">{expandedAbhanga.meaning}</p>
//                     <Button onClick={handleClose} variant="secondary">
//                       Close
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ) : (
//               // Regular Cards
//               filteredAbhangas.map((abhang) => (
//                 <Col key={abhang.id} md={4} className="mb-4">
//                   <Card className="abhang-card">
//                     <Card.Body>
//                       <blockquote className="abhang-text">
//                         {abhang.marathi.length > 100
//                           ? `${abhang.marathi.substring(0, 100)}...`
//                           : abhang.marathi}
//                       </blockquote>
//                       <p>
//                         <strong>Theme:</strong> {abhang.theme}
//                       </p>
//                       <Button
//                         onClick={() => handleReadMore(abhang)}
//                         variant="primary"
//                       >
//                         Read More
//                       </Button>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))
//             )}
//           </Row>
//         </Container>
//       </section>
//     </div>
//   );
// };

// export default AbhangasPage;