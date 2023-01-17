import React, {useEffect, useState, useCallback,} from 'react';
import Header from "../app-frame/app-header/app-header";
import "./privacy-policy.scss"
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import LoadingButtons from "../$widgets/buttons/loading-button"

function PrivacyPolicy(props) {

    const [isprivacy, setPrivacy] = useState('privacy')

    function Privacy(){
        if(isprivacy=='privacy'){
            setPrivacy('termsService')
        } else if(isprivacy=='termsService'){
            props.history.push('/signup/detail')
        }
      }

    return (
        <div className="privacy-main">
             <Header/>
            <div className="privacy-main-box">
                <div className="d-flex justify-content-center">
                    <div className="privacy-box">
                        <div className="privacy-text">
                            {isprivacy=='privacy'&&
                                <div>
                                    <h2 className="privacy-title">Privacy Policy</h2>
                                    <p>Effective as of June 15th, 2022</p>
                                    <p>
                                        This Privacy Policy describes how Tavus Inc. ("<b>Tavus," "we", “us”</b> or "<b>our</b>") handles personal information
                                        that we collect through our digital properties that link to this Privacy Policy, including our website
                                        (collectively, the “<b>Service</b>”), as well as through social media, our marketing activities, and other activities
                                        described in this Privacy Policy.
                                    </p>
                                    <p>
                                        Tavus may provide additional or supplemental privacy policies to individuals for specific products or
                                        services that we offer at the time we collect personal information.
                                    </p>
                                    <p>
                                        Tavus provides an AI video cloning platform that enables users to generate many personalized videos of
                                        themselves for their target audience. The Service is designed for businesses and their representatives.
                                        We do not offer products or services for use by individuals for their personal, family or household
                                        purposes. Accordingly, we treat all personal information we collect as pertaining to individuals in their
                                        capacities as business representatives and not their individual capacities.
                                    </p>
                                    <h4>Index</h4>
                                    <ul>
                                        <li><b>Personal information we collect</b></li>
                                        <li><b>How we use your personal information</b></li>
                                        <li><b>How we share your personal information</b></li>
                                        <li><b>Your choices</b></li>
                                        <li><b>Other sites and services</b></li>
                                        <li><b>Biometric Data Policy</b></li>
                                        <li><b>Security</b></li>
                                        <li><b>California Residents</b></li>
                                        <li><b>International data transfer</b></li>
                                        <li><b>European Union, UK, and similar jurisdictions</b></li>
                                        <li><b>Children</b></li>
                                        <li><b>Changes to this Privacy Policy</b></li>
                                        <li><b>How to contact us</b></li>
                                    </ul>
                                    <h4>Personal information we collect</h4>
                                    <p><b>Information you provide to us.</b> Personal information you may provide to us through the Service or
                                    otherwise includes:
                                    </p>
                                    <ul className="disc">
                                        <li><b>Contact data</b>, such as your first and last name, email address, billing and mailing addresses,
                                            company name, company domain name, professional title, and phone number.
                                        </li>
                                        <li><b>Profile data</b>, such as the username and password that you may set to establish an online
                                            account on the Service and any other information that you add to your account profile.
                                        </li>
                                        <li><b>Communications</b> that we exchange with you, including when you contact us through the
                                            Service, social media, or otherwise
                                        </li>
                                        <li><b>Transactional data</b>, such as information relating to or needed to complete your orders on or
                                            through the Service, including transaction history.
                                        </li>
                                        <li><b>Marketing data</b>, such as your preferences for receiving our marketing communications and
                                            details about your engagement with them.</li>
                                        <li><b>User content</b>, such as the initial audio and video samples you provide, the AI-generated videos
                                            you create through the Service, the business logo, contact information, and other distribution
                                            information you provide for any AI-generated videos, as well as any comments, questions,
                                            messages, and other files, content, or information that you generate, transmit, or otherwise
                                            make available on the Service, as well as associated metadata. Metadata includes information
                                            on how, when, where and by whom a piece of content was collected and how that content has
                                            been formatted or edited. Metadata also includes information that users can add or can have
                                            added to their content, such as keywords, geographical or location information, and other
                                            similar data.
                                        </li>
                                        <li><b>Payment information</b> needed to complete transactions, including payment card information or
                                            bank account number.
                                        </li>
                                        <li><b>Other data</b> not specifically listed here, which we will use as described in this Privacy Policy or as
                                            otherwise disclosed at the time of collection.
                                        </li>
                                    </ul>
                                    <p><b>Third-party sources.</b> We may combine personal information we receive from you with personal
                                        information we obtain from other sources, such as:
                                    </p>
                                    <ul className="disc">
                                        <li><b>Public sources,</b> such as public records, social media platforms, and other publicly available
                                            sources.
                                        </li>
                                        <li><b>Data providers,</b> such as information services and data licensors that provide demographic and
                                            other information.
                                        </li>
                                        <li><b>Our affiliate partners,</b> such as our affiliate network provider and publishers, influencers, and
                                            promoters who participate in our paid affiliate programs.
                                        </li>
                                        <li><b>Marketing partners,</b> such as joint marketing partners and event co-sponsors.
                                        </li>
                                        <li><b>Third-party services,</b> such as social media services, that you use to log into, or otherwise link to,
                                            your Service account. This data may include your username, profile picture and other
                                            information associated with your account on that third-party service that is made available to us
                                            based on your account settings on that service.

                                        </li>
                                    </ul>
                                    <p><b>Automatic data collection.</b> We, our service providers, and our business partners may automatically log
                                        information about you, your computer or mobile device, and your interaction over time with the
                                        Service, our communications and other online services, such as:
                                    </p>
                                    <ul className="disc">
                                        <li><b>Device data,</b>such as your computer’s or mobile device’s operating system type and version,
                                            manufacturer and model, browser type, screen resolution, RAM and disk size, CPU usage, device
                                            type (e.g., phone, tablet), IP address, unique identifiers (including identifiers used for advertising
                                            purposes), language settings, mobile device carrier, radio/network information (e.g., Wi-Fi, LTE,
                                            3G), and general location information such as city, state or geographic area.
                                        </li>
                                        <li><b>Online activity data,</b> such as pages or screens you viewed, how long you spent on a page or
                                            screen, the website you visited before browsing to the Service, navigation paths between pages
                                            or screens, information about your activity on a page or screen, access times and duration of
                                            access, and whether you have opened our emails or clicked links within them.
                                            </li>
                                        <li><b>Location data</b> when you authorize the Service to access your device’s location.
                                        </li>
                                    </ul>
                                    <p><b>Cookies and similar technologies.</b> Some of our automatic data collection is facilitated by cookies and
                                        similar technologies. Some of the automatic collection described above is facilitated by the following
                                        technologies:
                                    </p>
                                    <ul className="disc">
                                        <li><b>Cookies,</b> which are small text files that websites store on user devices and that allow web
                                            servers to record users’ web browsing activities and remember their submissions, preferences,
                                            and login status as they navigate a site. Cookies used on our sites include both “session cookies”
                                            that are deleted when a session ends, “persistent cookies” that remain longer, “first party”
                                            cookies that we place and “third party” cookies that our third-party business partners and
                                            service providers place.
                                        </li>
                                        <li><b>Local storage technologies,</b> like HTML5, that provide cookie-equivalent functionality but can
                                            store larger amounts of data on your device outside of your browser in connection with specific
                                            applications.
                                        </li>
                                        <li><b>Web beacons,</b> also known as pixel tags or clear GIFs, which are used to demonstrate that a
                                            webpage or email address was accessed or opened, or that certain content was viewed or
                                            clicked.
                                        </li>
                                        <li><b>Session Replay Technologies.</b> We use third-party services provided by Hotjar that employ
                                            software code to record users’ interactions with the Service in a manner that allows us to watch
                                            DVR-like replays of those user sessions. The replays include users’ clicks, mobile app touches,
                                            mouse movements, scrolls, and keystrokes/key touches during those sessions. These replays
                                            help us diagnose usability problems and identify areas for improvement. You can learn more
                                            about Hotjar at <Link to={{ pathname:"https://www.hotjar.com/legal/policies/privacy/"}} target="_blank"> https://www.hotjar.com/legal/policies/privacy/</Link> and you can opt-out of session
                                            recording by Hotjar at <Link to={{ pathname:"https://www.hotjar.com/privacy/"}} target="_blank">https://www.hotjar.com/privacy/</Link>.
                                        </li>
                                    </ul>
                                    <p><b>Data about others.</b> We may offer features that help users invite their colleagues or contacts to use the
                                        Service, and we may collect contact details about these invitees so we can deliver their invitations.
                                        Please do not refer someone to us or share their contact details with us unless you have their
                                        permission to do so.
                                    </p>
                                    <h4>How we use your personal information</h4>
                                    <p>We may use your personal information for the following purposes or as otherwise described at the time
                                        of collection:
                                    </p>
                                    <p><b>Service delivery. </b>We may use your personal information to:</p>
                                    <ul className="disc">
                                        <li>provide, operate and improve the Service and our business;</li>
                                        <li>establish and maintain your user profile on the Service;</li>
                                        <li>facilitate your invitations to colleagues or contacts who you want to invite to join the Service;</li>
                                        <li>enable security features of the Service, such as by sending you security codes via email or SMS,
                                            and remembering devices from which you have previously logged in;</li>
                                        <li>communicate with you about the Service, including by sending announcements, updates,
                                            security alerts, and support and administrative messages;</li>
                                        <li>understand your needs and interests, and personalize your experience with the Service and our
                                            communications; and</li>
                                        <li>provide support for the Service, and respond to your requests, questions and feedback.
                                        </li>
                                    </ul>
                                    <p><b>Research and development.</b> We may use your personal information for research and development
                                        purposes, including to analyze and improve the Service and our business.
                                    </p>
                                    <p><b>Marketing and advertising.</b> We, our service providers and our third-party advertising partners may
                                        collect and use your personal information for marketing and advertising purposes:
                                    </p>
                                    <ul className="disc">
                                        <li>
                                            <b>Direct marketing.</b> We may send you direct marketing communications. You may opt-out of our
                                            marketing communications as described in the <HashLink to="#Opt-out" > Opt-out of marketing</HashLink> section below.
                                        </li>
                                        <li id="Interest-based"><b>Interest-based advertising.</b> Our third-party advertising partners may use cookies and similar
                                            technologies to collect information about your interaction (including the data described in the
                                            automatic data collection section above) with the Service, our communications and other online
                                            services over time, and use that information to serve online ads that they think will interest you.
                                            This is called interest-based advertising. We may also share information about our users with
                                            these companies to facilitate interest-based advertising to those or similar users on other online
                                            platforms. You can learn more about <HashLink to="#your-choices" > your choices</HashLink> for limiting interest-based advertising in the
                                            Your choices section, below.
                                        </li>
                                    </ul>
                                    <p><b>To manage our recruiting and process employment applications.</b> We may use personal information,
                                        such as information submitted to us in a job application, to facilitate our recruitment activities and
                                        process employment applications, such as by evaluating a job candidate for an employment activity, and
                                        monitoring recruitment statistics.
                                    </p>
                                    <p id="compliance-&-protection"><b>Compliance and protection.</b> We may use your personal information to:</p>
                                    <ul className="disc">
                                        <li>comply with applicable laws, lawful requests, and legal process, such as to respond to
                                        subpoenas or requests from government authorities;</li>
                                        <li>protect our, your or others’ rights, privacy, safety or property (including by making and
                                        defending legal claims);</li>
                                        <li>audit our internal processes for compliance with legal and contractual requirements or our
                                        internal policies;</li>
                                        <li>enforce the terms and conditions that govern the Service; and</li>
                                        <li>prevent, identify, investigate and deter fraudulent, harmful, unauthorized, unethical or illegal
                                        activity, including cyberattacks and identity theft.
                                        </li>
                                    </ul>
                                    <p><b> With your consent.</b> In some cases, we may specifically ask for your consent to collect, use or share your
                                        personal information, such as when required by law.</p>
                                    <p><b>To create anonymous, aggregated or de-identified data.</b> We may create anonymous, aggregated or de-
                                        identified data from your personal information and other individuals whose personal information we
                                        collect. We make personal information into anonymous, aggregated or de-identified data by removing
                                        information that makes the data identifiable to you. We may use this anonymous, aggregated or de-
                                        identified data and share it with third parties for our lawful business purposes, including to analyze and
                                        improve the Service and promote our business.
                                    </p>
                                    <p><b>Cookies and similar technologies.</b> In addition to the other uses included in this section, we may use the
                                    Cookies and similar technologies described above for the following purposes:
                                    </p>
                                    <ul className="disc">
                                        <li><b>Technical operation.</b> To allow the technical operation of the Service, such as by remembering
                                            your selections and preferences as you navigate the site, and whether you are logged in when
                                            you visit password protected areas of the Service.
                                        </li>
                                        <li><b>Functionality.</b> To enhance the performance and functionality of our services.
                                        </li>
                                        <li><b>Advertising.</b> To help our third-party advertising partners collect information about how you use
                                            the Service and other online services over time, which they use to show you ads on other online
                                            services they believe will interest you and measure how the ads perform.
                                        </li>
                                        <li><b>Analytics.</b> To help us understand user activity on the Service, including which pages are most
                                            and least visited and how visitors move around the Service, as well as user interactions with our
                                            emails. For example, we use Google Analytics and Segment for this purpose. You can learn more
                                            about Google Analytics and how to prevent the use of Google Analytics relating to your use of
                                            our sites here: <Link to={{ pathname:" https://tools.google.com/dlpage/gaoptout?hl=en"}} target="_blank">https://tools.google.com/dlpage/gaoptout?hl=en</Link>. For more information on
                                            Segment, please review their privacy policy here: <Link to={{ pathname:"https://segment.com/legal/privacy/"}} target="_blank">https://segment.com/legal/privacy/</Link>.
                                        </li>
                                    </ul>
                                    <h4>How we share your personal information</h4>
                                    <p>We may share your personal information with the following parties and as otherwise described in this
                                        Privacy Policy or at the time of collection.
                                    </p>
                                    <p><b>Affiliates.</b> Our affiliated companies, for purposes consistent with this Privacy Policy.
                                    </p>
                                    <p><b>Service providers.</b> Third parties that provide services on our behalf or help us operate the Service or our
                                        business (such as hosting, information technology, customer support, email delivery, marketing and
                                        website analytics).
                                    </p>
                                    <p><b>Payment processors.</b> Any payment card information you use to make a purchase on the Service is
                                        collected and processed directly by our payment processors, such as Stripe and Recurly. Stripe may use
                                        your payment data in accordance with its privacy policy, <Link to={{ pathname:"https://stripe.com/privacy"}} target="_blank">https://stripe.com/privacy</Link>. Recurly may use
                                        your payment data in accordance with its privacy policy, <Link to={{ pathname:"https://recurly.com/legal/privacy"}} target="_blank">https://recurly.com/legal/privacy</Link>.
                                    </p>
                                    <p><b>Advertising partners.</b> Third-party advertising companies for the <HashLink to="#Interest-based">interest-based advertising purposes </HashLink> 
                                        described above.
                                    </p>
                                    <p><b>Third parties designated by you.</b> We may share your personal data with third parties where you have
                                        instructed us or provided your consent to do so. We will share personal information that is needed for
                                        these other companies to provide the services that you have requested.
                                    </p>  
                                    <p><b>Business and marketing partners.</b> Third parties with whom we co-sponsor events, with whom we jointly
                                        offer products or services, or whose products or services may be of interest to you.
                                    </p>
                                    <p><b>Linked third-party services.</b> If you link your Service account to, a social media or other third-party
                                        service, we may share your personal information with that third-party service. The third party’s use of
                                        the shared information will be governed by its privacy policy and the settings associated with your
                                        account with the third-party service.
                                    </p>
                                    <p><b>Professional advisors.</b> Professional advisors, such as lawyers, auditors, bankers and insurers, where
                                        necessary in the course of the professional services that they render to us.
                                    </p>
                                    <p><b>Authorities and others.</b> Law enforcement, government authorities, and private parties, as we believe in
                                        good faith to be necessary or appropriate for the <HashLink to="#compliance-&-protection"> compliance and protection purposes </HashLink> described above.
                                    </p>
                                    <p><b>Business transferees.</b> Acquirers and other relevant participants in business transactions (or
                                        negotiations of or due diligence for such transactions) involving a corporate divestiture, merger,
                                        consolidation, acquisition, reorganization, sale or other disposition of all or any portion of the business
                                        or assets of, or equity interests in, Tavus or our affiliates a
                                    </p>
                                    <h4 id="your-choices">Your choices</h4>
                                    <p><b>Access or update your information.</b> If you have registered for an account with us through the Service,
                                        you may review and update certain account information by logging into the account or by contacting us
                                        at support@tavus.io.</p>
                                    <p id="Opt-out"><b>Opt-out of marketing communications.</b> You may opt-out of marketing-related emails by following the
                                        opt-out or unsubscribe instructions at the bottom of the email, or by <HashLink to="#contact-us"> contacting us </HashLink>. Please note that if
                                        you choose to opt-out of marketing-related emails, you may continue to receive service-related and
                                        other non-marketing emails.
                                    </p>
                                    <p><b>Advertising choices.</b> You can limit use of your information for interest-based advertising by:
                                    </p>
                                    <ul className="disc">
                                        <li><b>Browser settings.</b> Blocking third-party cookies in your browser settings.
                                        </li>
                                        <li><b>Privacy browsers/plug-ins. </b> By using privacy browsers or ad-blocking browser plug-ins that let
                                            you block tracking technologies.
                                        </li>
                                        <li><b>Platform settings.</b> Google and Facebook offer opt-out features that let you opt-out of use of
                                            your information for interest-based advertising:
                                            <ul className="circle">
                                                <li>Google: <Link to={{ pathname:"https://adssettings.google.com/"}} target="_blank">https://adssettings.google.com/</Link></li>
                                                <li>Facebook: <Link to={{ pathname:"https://www.facebook.com/about/ads"}} target="_blank">https://www.facebook.com/about/ads</Link></li>
                                            </ul>
                                        </li>
                                        <li><b>Ad industry tools.</b> Opting out of interest-based ads from companies participating in the
                                            following industry opt-out programs:
                                            <ul className="circle">
                                                <li>Network Advertising Initiative: <Link to={{ pathname:"http://www.networkadvertising.org/managing/opt_out.asp"}} target="_blank">http://www.networkadvertising.org/managing/opt_out.asp</Link></li>
                                                <li>Digital Advertising Alliance: optout.aboutads.info.</li>
                                                <li>AppChoices mobile app, available at <Link to={{ pathname:"https://www.youradchoices.com/appchoices"}} target="_blank">https://www.youradchoices.com/appchoices</Link> which will allow you to opt-out of interest-based ads in mobile apps served by
                                                participating members of the Digital Advertising Alliance.</li>
                                            </ul>
                                        </li>
                                        <li><b>Mobile settings.</b>Using your mobile device settings to limit use of the advertising ID associated
                                            with your mobile device for interest-based advertising purposes.
                                        </li>
                                    </ul>
                                    <p>You will need to apply these opt-out settings on each device from which you wish to opt-out.
                                    </p>
                                    <p>We cannot offer any assurances as to whether the companies we work with participate in the opt-out
                                    programs described above.</p>
                                    <p><b>Do Not Track.</b>Some Internet browsers may be configured to send “Do Not Track” signals to the online
                                        services that you visit. We currently do not respond to “Do Not Track” or similar signals. To find out
                                        more about “Do Not Track,” please visit <Link to={{ pathname:"http://www.allaboutdnt.com."}} target="_blank">http://www.allaboutdnt.com.</Link></p>
                                    <p><b>Declining to provide information.</b> We need to collect personal information to provide certain services.
                                        If you do not provide the information we identify as required or mandatory, we may not be able to
                                        provide those services.
                                    </p>
                                    <p><b>Linked third-party platforms.</b> If you choose to connect to the Service through your social media account
                                        or other third-party platform, you may be able to use your settings in your account with that platform to
                                        limit the information we receive from it. If you revoke our ability to access information from a third-
                                        party platform, that choice will not apply to information that we have already received from that third
                                        party.
                                    </p>
                                    <p><b>Close your account.</b> You can choose to delete certain content through your account. If you wish to
                                        request to close your account, please <HashLink to="#contact-us">contact us.</HashLink>
                                    </p>
                                    <h4>Other sites and services</h4>
                                    <p>The Service may contain links to websites, mobile applications, and other online services operated by
                                    third parties. In addition, our content may be integrated into web pages or other online services that
                                    are not associated with us. These links and integrations are not an endorsement of, or representation
                                    that we are affiliated with, any third party. We do not control websites, mobile applications or online
                                    services operated by third parties, and we are not responsible for their actions. We encourage you to
                                    read the privacy policies of the other websites, mobile applications and online services you use.
                                    </p>
                                    <h4>Biometric Data Policy </h4>
                                    <p>Tavus collects and processes biometric data from individuals who use our services. It is important that
                                        you carefully read and understand the terms and conditions of this Policy. By accessing our Services, you
                                        are providing your consent to our collection, use and disclosure of your biometric information as
                                        described in this Policy. If you do not agree to these terms and conditions of the Policy, you are not
                                        authorized to use the Services or communicate with us via the Services.
                                    </p>
                                    <ul className="disc">
                                        <li>Biometric Data. Biometric data is identifying information related to your biometric
                                            characteristics which may be used to identify you. Examples of common forms of biometric data
                                            that you may use in your daily life include fingerprints, voiceprints, veins in your palm, facial
                                            recognition, and iris or retina recognition. Tavus uses certain physical information we collect
                                            about you, specifically biometrics related to voiceprints and facial recognition, in order to
                                            provide you our resources and services available through our websites, software, apps and
                                            other Services.</li>
                                        <li>Biometric Data Collection. When you sign up for a Tavus account to use our Services, you will be
                                        providing certain Biometric Data. To use the Services, you will need to provide a several video
                                        recordings. This data will be provided on the Tavus.io website or via APIs. Tavus collects that
                                        Biometric Data and then encrypts and stores it on Tavus’s data servers. To deliver the Services
                                        to you, Tavus stores and uses your Biometric Data as long as you have an active account. You
                                        may decline to provide your Biometric Data. However, if you decline to provide Biometric Data,
                                        certain Services that require the use of such data will become unavailable to you. You may also
                                        experience a loss of functionality of some or all of the Services that we provide.
                                        </li>
                                        <li>Use of Your Biometric Data. Tavus will use this stored biometric data to fulfill it’s service
                                        obligations, train AI models, and make requested custom videos.</li>
                                        <li>Security of Your Biometric Data. Tavus takes your Biometric Data security seriously and has
                                        implemented industry-standard data security technology to ensure that your Biometric Data is
                                        as secure as possible.</li>
                                        <li>Biometric Data Sharing or Selling. Tavus does not sell, lease, or trade your Biometric Data to any
                                        third parties or derive any profit in such a manner. Tavus may work with certain third parties to
                                        provide the Services to you, but only as necessary to provide you with such Services. Tavus has
                                        agreements with third parties that will receive your Biometric Data where the third party has a
                                        legitimate need to deliver the Services to you. These third parties are required to keep your
                                        Biometric Data secret and secure. We do not disclose or disseminate your Biometric Data
                                        without your request or consent or without the request or consent of your legally authorized
                                        representative. However, in certain specific instances, we may be compelled to disclose your
                                        Biometric Data in cases where such disclosure is required by State or federal law, or municipal
                                        ordinance, or when required pursuant to a valid warrant or subpoena issued by a court of
                                        competent jurisdiction.</li>
                                        <li>Account Closure. You may request that we delete your Biometric Data by notifying us at
                                        support@tavus.io. After you close your account, Tavus will keep your Biometric Data on file for a
                                        reasonable time of up to one-year, for reasons including fraud prevention. Tavus will
                                        permanently destroy your Biometric Data on or before the one-year anniversary of the date that
                                        you cancel your account. After your account is closed, you will need to re-register and provide
                                        your Biometric Data to Tavus before you can use our Services again.</li>
                                    </ul>
                                    <h4>Security</h4>
                                    <p>We employ a number of technical, organizational and physical safeguards designed to protect the
                                    personal information we collect. However, security risk is inherent in all internet and information
                                    technologies and we cannot guarantee the security of your personal information.
                                    </p>
                                    <h4>California Residents</h4> 
                                    <p>This section applies only to California consumers. It describes how we collect, use, and share California
                                    consumers' Personal Information in our role as a business, and the rights applicable to such residents. If
                                    you are unable to access this Privacy Policy due to a disability or any physical or mental impairment,
                                    please contact us and we will arrange to supply you with the information you need in an alternative
                                    format that you can access. For purposes of this section "Personal Information" has the meaning given
                                    in the California Consumer Privacy Act (“CCPA”). We might collect the following statutory categories of
                                    Personal Information:</p>
                                    <ul className="disc">
                                        <li>Personal Information: Your personal information includes all the data you provide us when you
                                        sign up for an account or enroll in our services, including your name, email address, telephone
                                        number. If you make a payment for services, your card information is not held by us, it is
                                        collected by our third-party payment processors, who specialize in the secure online capture
                                        and processing of card transactions.</li>
                                        <li>Geolocation data, such as IP address. We collect this information from your device.</li>
                                        <li>Inferences.</li>
                                        <li>Other personal information, in instances when you interact with us online, by phone or mail in
                                        the context of receiving help through our help desks or other support channels; participation in
                                        customer surveys or contests; or in providing the Service.</li>
                                    </ul>
                                    <p>As a California Resident, you have certain rights regarding the Personal Information we collect or
                                    maintain about you. Please note these rights are not absolute, and there may be cases when we decline
                                    your request as permitted by law. These rights include:</p>
                                    <ul className="disc">
                                        <li>The right of access means that you have the right to request that we disclose what Personal
                                        Information we have collected used and disclosed about you in the past 12 months.
                                        </li>
                                        <li>The right of deletion means that you have the right to request that we delete Personal
                                        Information collected or maintained by us, subject to certain exceptions.
                                        </li>
                                        <li>The right to non-discrimination means that you will not receive any discriminatory treatment
                                        when you exercise one of your privacy rights.
                                        </li>
                                    </ul>
                                    <p>As a California Resident, you can exercise your rights yourself or you can alternatively designate an
                                    authorized agent to exercise these rights on your behalf. Please note that to protect your Personal
                                    Information, we will verify your identity by a method appropriate to the type of request you are making.
                                    We may also request that your authorized agent have written permission from you to make requests onyour behalf, and we may also need to verify your authorized agent's identity to protect your Personal
                                    Information. Please use the contact details above if you would like to:
                                    </p>
                                    <ul className="disc">
                                        <li>As a California Resident, you can exercise your rights yourself or you can alternatively designate
                                        an authorized agent to exercise these rights on your behalf. Please note that to protect your
                                        Personal Information, we will verify your identity by a method appropriate to the type of
                                        request you are making. We may also request that your authorized agent have written
                                        permission from you to make requests on your behalf, and we may also need to verify your
                                        authorized agent's identity to protect your Personal Information. Please use the contact details
                                        above if you would like to:</li>
                                        <li>Access this policy in an alternative format,</li>
                                        <li>Exercise your rights,</li>
                                        <li>Learn more about your rights or our privacy practices, or</li>
                                        <li>Designate an authorized agent to make a request on your behalf.</li>
                                    </ul>
                                    <h4>International data transfer</h4>
                                    <p>We are headquartered in the United States and may use service providers that operate in other
                                    countries. Your personal information may be transferred to the United States or other locations where
                                    privacy laws may not be as protective as those in your state, province, or country.
                                    </p>
                                    <h4>European Union, UK, and similar jurisdictions</h4>
                                    <p>Subject to the conditions set out in the applicable law, Users in in the European Union/European
                                    Economic Area, and the United Kingdom ( as well as in other jurisdictions where similar rights apply)
                                    have the following rights regards our processing of their personal information:
                                    </p>
                                    <ul className="disc">
                                        <li>Right of access: If you ask us, we will confirm whether we are processing your personal
                                        information and, if necessary, provide you with a copy of that personal information (along with
                                        certain other details).
                                        </li>
                                        <li>Right to correction (rectification): If the personal information we hold about you is inaccurate or
                                        incomplete, you are entitled to request to have it corrected. If you are entitled to have
                                        information corrected and if we have shared your personal information with others, we will let
                                        them know about the rectification where possible.
                                        </li>
                                        <li>Right to erasure: You can ask us to delete your personal information in some circumstances,
                                        such as where we no longer need it or if you withdraw your consent (where applicable). If you
                                        request that we delete your personal information, we may do so by deleting your account(s)
                                        with us.</li>
                                        <li>Right to restrict (block) processing: You can ask us to restrict the processing of your personal
                                        information in certain circumstances, such as where you contest the accuracy of that personal
                                        information, or you object to our use or stated legal basis.
                                        </li>
                                        <li>Right to data portability: You have the right, in certain circumstances, to receive a copy of
                                        personal information we have obtained from you in a structured, commonly used, and machine-
                                        readable format, and to reuse it elsewhere or to ask us to transfer this to a third party of your
                                        choice.</li>
                                        <li>Right to object: Where our processing is based on our legitimate interests, we must stop such
                                        processing unless we have compelling legitimate grounds that override your interest or where
                                        we need to process it for the establishment, exercise, or defense of legal claims. Where we are•
                                        relying on our legitimate interests, we believe that we have a compelling interest in such
                                        processing, but we will individually review each request and related circumstances.
                                        </li>
                                        <li>Right to object to marketing: You can ask us to stop processing your personal information to the
                                        extent we do so based on our legitimate interests for marketing purposes. If you do so, we will
                                        stop such processing for our marketing purposes.
                                        </li>
                                        <li>Right not to be subject to automated decision-making: You have the right not to be subject to a
                                        decision when it is based on automatic processing if it produces a legal effect or similarly
                                        significantly affects you unless it is necessary for entering into or performing a contract between
                                        us. Tavus does not engage in automated decision-making.
                                        </li>
                                        <li>Right to withdraw your consent: In the event your personal information is processed based on
                                        your consent, you have the right to withdraw consent at any time, without affecting the
                                        lawfulness of processing based on consent before its withdrawal.
                                        </li>
                                        <li>Right to lodge a complaint: You also have the right to lodge a complaint with a supervisory
                                        authority if you consider that our processing of your personal information infringes the law.
                                        </li>
                                    </ul>
                                    <h4>Children</h4>
                                    <p>The Service is not intended for use by anyone under 18 years of age. If you are a parent or guardian of a
                                    child from whom you believe we have collected personal information in a manner prohibited by law,
                                    please contact us. If we learn that we have collected personal information through the Service from a
                                    child without the consent of the child’s parent or guardian as required by law, we will comply with
                                    applicable legal requirements to delete the information.
                                    </p>
                                    <h4>Changes to this Privacy Policy</h4>
                                    <p>We reserve the right to modify this Privacy Policy at any time. If we make material changes to this
                                    Privacy Policy, we will notify you by updating the date of this Privacy Policy and posting it on the Service
                                    or other appropriate means. Any modifications to this Privacy Policy will be effective upon our posting
                                    the modified version (or as otherwise indicated at the time of posting). In all cases, your use of the
                                    Service after the effective date of any modified Privacy Policy indicates your acceptance of the modified
                                    Privacy Policy.
                                    </p>
                                    <h4 id="contact-us">How to contact us</h4>
                                    <ul className="disc">
                                        <li><b>Email:</b> <span onClick={() => window.open('mailto:support@tavus.io')}>support@tavus.io</span></li>
                                        <li><b>Mail:</b> 2101 CityWest Blvd, 1 st floor, Houston TX 77042</li>
                                    </ul>
                                </div>
                            }
                            {isprivacy=='termsService'&&
                                <div>
                                    <h2 className="privacy-title"> Terms of Service </h2>
                                    <p>
                                    Welcome and thank you for your interest in Tavus Inc. (<b>“Company”, “us”, “our”,</b> and <b>“we”</b>) and in our
                                    website (located at www.tavus.io) and SaaS Services (the <b>“Site”</b>) and any other associated websites and
                                    subdomains, networks, products and services on which a link to these Terms is displayed. The Site is a
                                    copyrighted work belonging to Company. These Terms of Use (these <b>“Terms”</b>) set forth the legally
                                    binding terms and conditions between you and Company governing your access to and use of the Site.
                                    Certain features of the Site may be subject to additional guidelines, terms, or rules, which will be posted
                                    on the Site in connection with such features (<b>“Supplemental Terms”</b>). All such Supplemental Terms,
                                    including our Privacy Policy, are incorporated by reference into these Terms. If these Terms are
                                    inconsistent with the Supplemental Terms, the Supplemental Terms shall control with respect to such
                                    features. Notwithstanding the foregoing, Company’s provision of, and your access to and use of, the
                                    software-as-a-service offering accessed at the Site for the generation of personalized videos and other
                                    content, together with the associated documentation (<b>“SaaS Services”</b>) is governed by the terms and
                                    conditions of the Tavus Software as a Service Agreement (<b>“SaaS Agreement”</b>), which will be a separate
                                    agreement between you and Company if you subscribe for the SaaS Services (or between your
                                    organization and Company if your organization subscribes for the SaaS Services) and which will
                                    supersede these Terms to the limited extent of any inconsistency or conflict.
                                    </p>
                                    <p>BY CLICKING “I ACCEPT”, OR OTHERWISE ACCESSING OR USING THE SITE, YOU ACKNOWLEDGE AND
                                    AGREE THAT YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND BY THESE TERMS (ON BEHALF
                                    OF YOURSELF OR THE ENTITY THAT YOU REPRESENT), AND YOU REPRESENT AND WARRANT THAT YOU
                                    HAVE THE RIGHT, AUTHORITY, AND CAPACITY TO ENTER INTO THESE TERMS (ON BEHALF OF YOURSELF
                                    OR THE ENTITY THAT YOU REPRESENT). IF THE INDIVIDUAL ENTERING INTO THESE TERMS OR
                                    OTHERWISE ACCESSING OR USING THE SITE IS DOING SO ON BEHALF OF, OR WITHIN HIS OR HER
                                    CAPACITY AS A REPRESENTATIVE, AGENT, OR EMPLOYEE OF, AN ENTITY, SUCH INDIVIDUAL AND SUCH
                                    ENTITY: (1) AGREE THAT THE TERMS “YOU” AND “YOUR” AS USED HEREIN APPLY TO SUCH ENTITY AND
                                    SUCH INDIVIDUAL; AND (2) REPRESENT AND WARRANT THAT THE INDIVIDUAL ENTERING INTO THESE
                                    TERMS HAS THE POWER, RIGHT, AUTHORITY, AND CAPACITY TO ENTER INTO THESE TERMS ON BEHALF
                                    OF SUCH ENTITY. YOU MAY NOT ACCESS OR USE THE SITE OR ACCEPT THESE TERMS IF YOU ARE NOT
                                    ELIGIBLE (AS DESCRIBED IN SECTION 1.1 BELOW). IF YOU DO NOT AGREE WITH ALL OF THE PROVISIONS
                                    OF THESE TERMS, YOU MAY NOT ACCESS AND/OR USE THE SITE.</p>
                                    <p>THESE TERMS REQUIRE THE USE OF ARBITRATION (SECTION 11.2) ON AN INDIVIDUAL BASIS TO RESOLVE
                                    DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS, AND ALSO LIMIT THE REMEDIES AVAILABLE TO YOU IN THE EVENT OF A DISPUTE</p>
                                    <p>PLEASE NOTE THAT THESE TERMS ARE SUBJECT TO CHANGE BY COMPANY IN ITS SOLE DISCRETION AT
                                    ANY TIME. See Section 11.1 of these Terms for further information about changes to these Terms.
                                    PLEASE REGULARLY CHECK OUR WEBSITE TO VIEW THE THEN-CURRENT TERMS.</p>
                                    <h4>1. ACCOUNTS</h4>
                                    <p> <b>1.1 Eligibility.</b> You must be at least eighteen (18) years old to use the Site. By agreeing to
                                    these Terms, you represent and warrant to us that you are at least eighteen (18) years old.</p>
                                    <p> <b> 1.2 Account Creation.</b> In order to use certain features of the Site, you must (i) register for
                                        an account (<b>“Account”</b>) and provide certain information about yourself as prompted by the account
                                        registration form, or (ii) have a valid account on a social networking service (<b>“SNS”</b>) through which the
                                        user has connected to the Site (each such account, a <b>“SNS Account”</b>). In registering an Account, you
                                        agree, represent and warrant that: (a) all required registration information you submit is truthful and
                                        accurate; (b) you will maintain the accuracy of such information; and (c) you will not create an Account
                                        using a false identity or information, or on behalf of someone other than yourself. You may delete your
                                        Account at any time, for any reason, by following the instructions on the Site. Company may suspend or
                                        terminate your Account in accordance with Section 8.</p>
                                    <p>1.3 Access through a SNS. If you access the Site through a SNS as part of the functionality of
                                    the Site, you may link your Account with SNS Accounts by allowing Company to access your SNS
                                    Account, as is permitted under the applicable terms and conditions that govern your SNS Account. You
                                    represent that you are entitled to grant Company access to your SNS Account (including, but not limited
                                    to, for use for the purposes described herein) without breach by you of any of the terms and conditions
                                    that govern your SNS Account and without obligating Company to pay any fees or making Company
                                    subject to any usage limitations imposed by such SNS. By granting Company access to any SNS Accounts,
                                    you understand that Company may access, make available and store (if applicable) any information,
                                    data, text, software, music, sound, photographs, graphics, video, messages, tags and other materials
                                    accessible through the Site (collectively, <b>“Content”</b>) that you have provided to and stored in your SNS
                                    Account (<b>“SNS Content”</b>) so that it is available on and through the Site via your Account. Unless
                                    otherwise specified in these Terms, all SNS Content shall be considered to be your User Content (as
                                    defined in Section 3.1) for all purposes of these Terms. Depending on the SNS Accounts you choose and
                                    subject to the privacy settings that you have set in such SNS Accounts, personally identifiable
                                    information that you post to your SNS Accounts may be available on and through your Account on the
                                    Site. Please note that if a SNS Account or associated service becomes unavailable, or Company’s access
                                    to such SNS Account is terminated by the SNS, then SNS Content will no longer be available on and
                                    through the Site. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE SNS PROVIDERS ASSOCIATED WITH
                                    YOUR SNS ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH SNS PROVIDERS, AND
                                    COMPANY DISCLAIMS ANY LIABILITY FOR PERSONALLY IDENTIFIABLE INFORMATION THAT MAY BE
                                    PROVIDED TO IT BY SUCH SNS PROVIDERS IN VIOLATION OF THE PRIVACY SETTINGS THAT YOU HAVE SET
                                    IN SUCH SNS ACCOUNTS. Company makes no effort to review any SNS Content for any purpose,
                                    including but not limited to, for accuracy, legality or non-infringement, and Company is not responsible
                                    for any SNS Content.</p>
                                    <p> <b> 1.4 Account Responsibilities.</b> You are responsible for maintaining the confidentiality of
                                        your Account login information and are fully responsible for all activities that occur under your Account.
                                        You agree to immediately notify Company of any unauthorized use, or suspected unauthorized use of
                                        your Account or any other breach of security. Company cannot and will not be liable for any loss or
                                        damage arising from your failure to comply with the above requirements.
                                        </p>
                                    <h4> 2. ACCESS TO THE SITE</h4>
                                    <p> <b> 2.1 Access and Use.</b> Subject to these Terms, Company grants you a non-transferable, non-
                                            exclusive, revocable, non-assignable, limited right and license to use and access the Site solely for your
                                            own internal business use, and subject to any use limitations put in place or provided by Company.</p>
                                    <p> <b> 2.2 Certain Restrictions and User Conduct. </b> The Site is made available to you solely for your
                                        own internal business use. The rights granted to you in these Terms are subject to the following
                                        restrictions: you shall not, directly or indirectly, and shall not authorize any third party to</p>
                                    <ul className='alpha'>
                                        <li>license, sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit
                                        the Site, whether in whole or in part, or any content displayed on the Site;</li>
                                        <li>frame or utilize framing techniques to enclose any trademark, logo, or other parts of the Site
                                        (including images, text, page layout or form);</li>
                                        <li>you shall not use any metatags or other “hidden text” using Company’s name or trademarks;</li>
                                        <li>translate, adapt, modify, merge, make derivative works of, decompile, disassemble, reverse
                                        compile or reverse engineer, or otherwise attempt to derive any source code, structure, ideas,
                                        algorithms or associated know-how of, any part of the Site, or reconstruct, or discover, any
                                        hidden or non-public elements of the Site;</li>
                                        <li>write or develop any program based upon the Site or any portion thereof, or access the Site
                                        in any manner for the purpose of developing, distributing or making accessible a website,
                                        product, or service that competes with the Site;</li>
                                        <li>export, sell or distribute any content or portion of the Site, allow access to the Site (or any
                                        content or other portion thereof) by any third persons or entities, make the Site available on a
                                        service bureau basis, or otherwise access or use the Site for the benefit of a third party;</li>
                                        <li>permit your Account to be accessed or used by any persons other than your employee personnel;</li>
                                        <li> attempt to engage in or engage in, any potentially harmful acts that are directed against the
                                        Site, including but not limited to violating or using manual or automated software or other
                                        means to access, “scrape,” “crawl” or “spider” any pages contained in the Site or interfering
                                        with the use of Site by any other user, host or network;</li> 
                                        <li>transmit unlawful, infringing, or harmful User Content or other data or code that you are not
                                        authorized to transmit, either to or from the Site;</li>
                                        <li>interfere or attempt to interfere with, disrupt, or create an undue burden on servers or
                                        networks connected to the Site, including by means of overloading, “flooding,” “spamming,”
                                        “mail bombing,” or “crashing” the Site, or violate the regulations, policies or procedures of such
                                        networks;</li>
                                        <li>attempt to violate any security features of the Site or gain unauthorized access to the Site (or
                                        to other computer systems or networks connected to or used together with the Site), whether
                                        through password mining or any other means;</li>
                                        <li>alter or remove any trademarks or proprietary notices contained in or on the Site;</li>
                                        <li>engage in framing, mirroring, or otherwise simulating the appearance or function of the Site;</li>
                                        <li>perform or publish any performance or benchmark tests or analyses relating to the Site;</li> 
                                        <li>make any User Content available on or through the Site that infringes, violates or
                                        misappropriates any patent, trademark, trade secret, copyright, right of publicity, privacy right
                                        or other right of any person or entity or is unlawful, threatening, abusive, harassing,
                                        defamatory, libelous, deceptive, fraudulent, invasive of another’s privacy, tortious, indecent,
                                        obscene, offensive, or profane;</li>
                                        <li>make any User Content available on or through the Site that constitutes unauthorized or
                                        unsolicited advertising, junk or bulk e-mail, involves commercial activities and/or sales, such as
                                        contests, sweepstakes, barter, advertising, or pyramid schemes without Company’s prior
                                        written consent, or impersonates any person or entity, including any employee or
                                        representative of Company;</li>
                                        <li>make available on or through the Site any computer code, programs, or programming
                                        devices that are designed to disrupt, modify, access, delete, damage, deactivate, disable, harm,
                                        or otherwise impede in any manner, the operation of the Site or any other associated software,
                                        firmware, hardware, computer system, or network (including, without limitation, “Trojan
                                        horses,” “viruses,” “worms,” “time bombs,” “time locks,” “devices,” “traps,” “access codes,” or
                                        “drop dead” or “trap door” devices) or any other harmful, malicious, or hidden procedures,
                                        routines or mechanisms that would cause the Site to cease functioning or to damage or corrupt
                                        data, storage media, programs, equipment, or communications, or otherwise interfere with
                                        operation;</li>
                                        <li>remove or destroy any copyright notices or other proprietary markings contained on or in the Site or</li>
                                        <li>otherwise use the Site except as expressly permitted hereunder.</li>
                                    </ul>
                                    <p>Unless otherwise indicated, any future release, update, or other addition to functionality of the Site shall
                                    be subject to these Terms.</p>
                                    <p> <b> 2.3 Modification.</b> Company reserves the right, at any time, to modify, suspend, or
                                    discontinue the Site (in whole or in part) with or without notice to you. You agree that Company will not
                                    be liable to you or to any third party for any modification, suspension, or discontinuation of the Site or
                                    any part thereof.</p>
                                    <p> <b>2.4 No Support or Maintenance.</b> Unless you have subscribed for SaaS Services that expressly include Company’s support or maintenance services, you acknowledge and agree that
                                    Company will have no obligation to provide you with any support or maintenance in connection with the Site.</p>
                                    <p> <b>2.5 Ownership.</b> Excluding any User Content that you may provide, you acknowledge that all
                                    the intellectual property rights, including copyrights, patents, trademarks, and trade secrets, in the Site
                                    and its content are owned by Company or Company’s suppliers or licensors. Neither these Terms (nor
                                    your access to or use of the Site) transfers to you or any third party any rights, title or interest in or to
                                    such intellectual property rights, except for the limited access rights expressly set forth in Section 2.1.
                                    Company and its suppliers reserve all rights not granted in these Terms. There are no implied licenses
                                    granted under these Terms. Tavus and all related graphics, logos, service marks and trade names used on or in connection with the Service are the trademarks of Company and may not be used without
                                    permission in connection with your, or any third-party, products or services. Other trademarks, service marks and trade names that may appear on or in Service are the property of their respective owners.</p>
                                    <h4>3. USER CONTENT AND FEEDBACK</h4>
                                    <p> <b> 3.1 User Content. “User Content” </b> means any and all information and content that a user
                                    submits to, or uses with, the Site (e.g., content in the user’s profile or postings), but does not include
                                    content generated by the Site or by Company’s software or SaaS Services. This means that you, and not
                                    Company, are solely responsible for all User Content that is accessible through the Site. You assume all
                                    risks associated with use of User Content, including any reliance on its accuracy, completeness or
                                    usefulness by others, or any disclosure of your User Content that personally identifies you or any third
                                    party, and you agree that Company will not be responsible for any liability incurred as the result of your
                                    use of User Content. Unless you have subscribed for SaaS Services that expressly include Company’s
                                    backup of your User Content, Company is not obligated to backup any User Content, and your User
                                    Content may be deleted at any time without prior notice. You are solely responsible for creating and
                                    maintaining your own backup copies of your User Content if you desire.</p>
                                    <p> <b> 3.2 License to User Content. </b> Company does not claim ownership of User Content.
                                    However, when you as a user post, upload or publish User Content on or in the Site, then you hereby
                                    grant (and you represent and warrant that you have the right to grant) Company an irrevocable, non-
                                    exclusive, royalty-free and fully paid, worldwide, and fully sublicensable right (including any moral
                                    rights) and license to reproduce, distribute, modify, adapt, publicly display and perform, and otherwise
                                    use and exploit your User Content (in whole or in part) for the purposes of operating and providing the
                                    Site to you.</p>
                                    <p> <b>3.3 Feedback. </b> You agree that submission of any ideas, suggestions, documents, and/or
                                    proposals to Company through its suggestion, feedback, wiki, forum, or similar pages (“Feedback”) is at
                                    your own risk and that Company has no obligations (including without limitation obligations of
                                    confidentiality) with respect to such Feedback. You represent and warrant that you have all rights
                                    necessary to submit the Feedback. You hereby grant to Company a fully paid, royalty-free, perpetual,
                                    irrevocable, worldwide, and non-exclusive right and license to use, reproduce, perform, display,
                                    distribute, adapt, modify, re-format, create derivative works of, and otherwise commercially or non-
                                    commercially exploit in any manner, any and all Feedback, and to sublicense the foregoing rights, in
                                    connection with the operation and maintenance of the Site and/or Company’s business.</p>
                                    <p> <b> 3.4 Representations and Warranties.</b> You represent and warrant that you will comply with all applicable laws and have all necessary right, title, interest, authorizations, consents and permissions to: (i) access, provide, provide access to, and request Company access, disclose, or submit any of User Content and Feedback, as applicable, that you provide, provide access to, disclose, or submit to  Company or the Site, or that you authorize or request Company to access on your behalf, as applicable; and (ii) grant the rights, licenses and permissions granted hereunder with respect to User Content and Feedback.</p>
                                    <p> <b> 4. INDEMNIFICATION.</b> You agree to indemnify and hold Company (and its officers, employees, and agents) (each, a <b>“Company Party”</b>) harmless, from any losses, costs, liabilities and expenses (including reasonable attorneys’ fees) relating to or arising out of any and all of the following: (a) your use of the Site, (b) your User Content, (c) your violation of these Terms; or (d) your violation of applicable laws or regulations or rights of any person or entity. Company reserves the right, at its own
                                    cost, to assume the exclusive defense and control of any matter for which you are required to indemnify us, in which event you will fully cooperate with Company in asserting any available defenses. You agree not to settle any matter without the prior written consent of Company. This provision does not require you to indemnify any of Company Parties for any unconscionable commercial practice by such Company
                                    Party or for such Company Party’s fraud, deception, false promise, misrepresentation or concealment, or suppression or omission of any material fact in connection with the Site.</p>
                                    <h4>5.OTHER USERS</h4>
                                    <p> <b> 5.1 Other Users.</b> Each Site user is solely responsible for any and all of its own User Content.
                                        Because we do not control User Content, you acknowledge and agree that we are not responsible for
                                        any User Content, whether provided by you or by others. We make no guarantees regarding the
                                        accuracy, currency, suitability, or quality of any User Content. Your interactions with other Site users
                                        are solely between you and such users. You agree that Company will not be responsible for any loss or
                                        damage incurred as the result of any such interactions. If there is a dispute between you and any Site
                                        user, we are under no obligation to become involved.</p>
                                        <p> <b> 5.2 Release.</b> You hereby release and forever discharge the Company (and our officers, employees, agents, successors, and assigns) from, and hereby waive and relinquish, each and every past, present and future dispute, claim, controversy, demand, right, obligation, liability, action and cause of action of every kind and nature (including personal injuries, death, and property damage), that has arisen or arises directly or indirectly out of, or that relates directly or indirectly to, the Site (including any interactions with, or act or omission of, other Site users). If you are a California resident, you hereby
                                        waive California Civil Code 1542 in connection with the foregoing, which states, “A general release does
                                        not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her
                                        favor at the time of executing the release and that, if known by him or her, would have materially
                                        affected his or her settlement with the debtor or released party.” The foregoing release does not apply
                                        to any claims, demands, or any losses, damages, rights and actions of any kind, including personal
                                        injuries, death or property damage for any unconscionable commercial practice by a Company Party or
                                        for such Company Party’s fraud, deception, false, promise, misrepresentation or concealment,
                                        suppression or omission of any material fact in connection with the Site.</p>
                                        <h4>6. DISCLAIMERS</h4>
                                        <p>THE SITE IS PROVIDED ON AN “AS-IS” AND “AS AVAILABLE” BASIS, AND COMPANY (AND OUR SUPPLIERS
                                        AND LICENSORS) EXPRESSLY DISCLAIM ANY AND ALL WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ALL WARRANTIES OR CONDITIONS OF
                                        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, OR NON-INFRINGEMENT. WE (AND OUR SUPPLIERS AND LICENSORS) MAKE NO WARRANTY THAT THE SITE WILL MEET YOUR REQUIREMENTS, WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR
                                        ERROR-FREE BASIS, OR WILL BE ACCURATE, RELIABLE, FREE OF VIRUSES OR OTHER HARMFUL CODE, COMPLETE, LEGAL, OR SAFE. IF APPLICABLE LAW REQUIRES ANY WARRANTIES WITH RESPECT TO THE SITE, ALL SUCH WARRANTIES ARE LIMITED IN DURATION TO NINETY (90) DAYS FROM THE DATE OF FIRST  USE.</p>
                                        <p>SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE
                                        EXCLUSION MAY NOT APPLY TO YOU. SOME JURISDICTIONS DO NOT ALLOW LIMITATIONS ON HOW LONG AN IMPLIED WARRANTY LASTS, SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.</p>
                                    <h4>7. LIMITATION ON LIABILITY</h4>
                                    <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY (OR OUR SUPPLIERS) BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFITS, LOST DATA, COSTS OF PROCUREMENT OF SUBSTITUTE PRODUCTS, OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM OR RELATING TO THESE TERMS OR YOUR USE OF, OR INABILITY TO USE, THE SITE, EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO, AND USE OF, THE SITE IS AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY
                                    RESPONSIBLE FOR ANY DAMAGE TO YOUR DEVICE OR COMPUTER  SYSTEM, OR LOSS OF DATA RESULTING THEREFROM.</p>
                                    <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, THE COMPANY PARTIES’ S AGGREGATE LIABILITY TO YOU ARISING FROM OR
                                    RELATED TO THESE TERMS (FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION), WILL AT ALL TIMES BE LIMITED TO A MAXIMUM OF FIFTY US DOLLARS (U.S. $50). THE
                                    EXISTENCE OF MORE THAN ONE CLAIM WILL NOT ENLARGE THIS LIMIT. YOU AGREE THAT OUR SUPPLIERS AND LICENSORS WILL HAVE NO LIABILITY OF ANY KIND ARISING FROM OR RELATING TO THESE TERMS.</p>
                                    <p>THE FOREGOING LIMITATIONS ON LIABILITY AND CAP ON LIABILITY SHALL NOT APPLY TO LIABILITY OF A COMPANY PARTY FOR (I) DEATH OR PERSONAL INJURY CAUSED BY A COMPANY PARTY’S NEGLIGENCE; OR FOR (II) ANY INJURY CAUSED BY A COMPANY PARTY’S FRAUD OR FRAUDULENT MISREPRESENTATION.</p>
                                    <p>THE LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN COMPANY AND YOU.</p>
                                    <p>SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.</p>
                                    <p> <b>8. TERM AND TERMINATION.</b> Subject to this Section, these Terms will remain in full force and
                                        effect while you use the Site, subject to Section 11.1 below. We may suspend or terminate your rights
                                        to use the Site (including your Account) at any time for any reason at our sole discretion, including for
                                        any use of the Site in violation of these Terms. Upon termination of your rights under these Terms, your
                                        Account and right to access and use the Site will terminate immediately. You understand that any
                                        termination of your Account may involve deletion of your User Content associated with your Account
                                        from our live databases. Company will not have any liability whatsoever to you for any termination of
                                        your rights under these Terms, including for termination of your Account or deletion of your User
                                        Content. Even after your rights under these Terms are terminated, the following provisions of these
                                        Terms will remain in effect: Sections 2.2-2.5, 3 –11.</p>
                                    <h4>9. COPYRIGHT POLICY.</h4>
                                    <p>Company respects the intellectual property of others and asks that users of our Site do the same. In connection with our Site, we have adopted and implemented a policy respecting copyright law that provides for the removal of any infringing materials and for the termination, in appropriate circumstances, of users of our online Site who are repeat infringers of intellectual property rights, including copyrights. If you believe that one of our users is, through the use of our Site, unlawfully
                                    infringing the copyright(s) in a work, and wish to have the allegedly infringing material removed, the
                                    following information in the form of a written notification (pursuant to 17 U.S.C. § 512(c)) must be
                                    provided to our designated Copyright Agent:</p>
                                    <ul className='decimal'>
                                        <li>your physical or electronic signature;</li>
                                        <li>identification of the copyrighted work(s) that you claim to have been infringed;</li>
                                        <li>identification of the material on our services that you claim is infringing and that you request us to remove;</li>
                                        <li>sufficient information to permit us to locate such material;</li>
                                        <li>your address, telephone number, and e-mail address;</li>
                                        <li>a statement that you have a good faith belief that use of the objectionable material is not authorized by the copyright owner, its agent, or under the law; and</li>
                                        <li>a statement that the information in the notification is accurate, and under penalty of perjury, that you are either the owner of the copyright that has allegedly been infringed or that you are authorized to act on behalf of the copyright owner.</li>
                                    </ul>
                                    <p>Please note that, pursuant to 17 U.S.C. § 512(f), any misrepresentation of material fact (falsities) in a written notification automatically subjects the complaining party to liability for any damages, costs and attorney’s fees incurred by us in connection with the written notification and allegation of copyright infringement.</p>
                                    <p>The designated Copyright Agent for Company is:</p>
                                    <p>Designated Agent: Quinn Favret</p>
                                    <p>Address of Agent: 2101 CityWest Blvd, Houston TX 77042</p>
                                    <p>Telephone: 248.709.4196</p>
                                    <p>Fax:</p>
                                    <p>Email: QUINN@TAVUS.IO</p>
                                    <p> <b>10. THIRD PARTY PAYMENT PROCESSOR.</b> Company uses Stripe, Inc. and Recurly, Inc. and their
                                        respective affiliates as third party service providers for payment services (e.g. card acceptance,
                                        merchant settlement, and related services) (each, a <b>“Third Party Payment Processor”</b>). You agree to be
                                        bound by Stripe’s privacy policy (currently accessible at <Link to={{ pathname:"https://stripe.com/privacy"}} target="_blank"> https://stripe.com/privacy</Link> ) and its terms of
                                        service (currently accessible at <Link to={{ pathname:"https://stripe.com/us/terms"}} target="_blank">https://stripe.com/us/terms</Link> ), or Recurly’s privacy policy (currently
                                        accessible at <Link to={{ pathname:"https://recurly.com/legal/privacy"}} target="_blank"> https://recurly.com/legal/privacy</Link> ) and its terms of service (currently available at
                                        <Link to={{ pathname:"https://recurly.com/legal/terms/"}} target="_blank">https://recurly.com/legal/terms/</Link> ), as applicable, and you hereby consent and authorize Company and
                                        Stripe or Recurly, as applicable, to share any information and payment instructions you provide with one
                                        or more Third Party Payment Processor(s) to the minimum extent required to complete your
                                        transactions.</p>
                                        <h4>11. GENERAL</h4>
                                        <p> <b> 11.1 Changes. </b> These Terms are subject to occasional revision. If we make any substantial
                                        changes, we may notify you by sending you an e-mail to the last e-mail address you provided to us (if
                                        any), and/or by prominently posting notice of the changes on our Site. You are responsible for providing
                                        us with your most current e-mail address. In the event that the last e-mail address that you have
                                        provided us is not valid, or for any reason is not capable of delivering to you the notice described above,
                                        our dispatch of the e-mail containing such notice will nonetheless constitute effective notice of the changes described in the notice. Any changes to these Terms will be effective upon the earlier of thirty
                                        (30) calendar days following our dispatch of an e-mail notice to you (if applicable) or thirty (30) calendar
                                        days following our posting of notice of the changes on our Site. These changes will be effective
                                        immediately for new users of our Site. Continued use of our Site following notice of such changes shall
                                        indicate your acknowledgement of such changes and agreement to be bound by the terms and
                                        conditions of such changes.</p>
                                        <p><b> 11.2Dispute Resolution. PLEASE READ THIS CAREFULLY. IT AFFECTS YOUR RIGHTS.</b></p>
                                        <ul className='alpha'>
                                            <li>Any and all controversies, disputes, demands, counts, claims, or causes of action
                                            (including the interpretation and scope of this clause, and the arbitrability of the controversy, dispute,
                                            demand, count, claim, or cause of action) between you and Company and our employees, agents,
                                            successors, or assigns, regarding or relating to the Site or these Terms shall exclusively be settled
                                            through binding and confidential arbitration.</li>
                                            <li>Arbitration shall be subject to the Federal Arbitration Act and not any state
                                            arbitration law. The arbitration shall be conducted before one commercial arbitrator with substantial
                                            experience in resolving commercial contract disputes from the American Arbitration Association (“AAA”)
                                            or JAMS. As modified by these Terms, and unless otherwise agreed upon by the parties in writing, the
                                            arbitration will be governed by the AAA’s or JAMS’s rules for commercial arbitration and, if the
                                            arbitrator deems them applicable, the procedures for consumer-related disputes.</li>
                                            <li>You are thus GIVING UP YOUR RIGHT TO GO TO COURT to assert or defend your
                                            rights EXCEPT for matters that may be taken to small claims court. Your rights will be determined by a
                                            NEUTRAL ARBITRATOR and NOT a judge or jury. You are entitled to a FAIR HEARING, BUT the arbitration
                                            procedures are SIMPLER AND MORE LIMITED THAN RULES APPLICABLE IN COURT. Arbitrator decisions
                                            are as enforceable as any court order and are subject to VERY LIMITED REVIEW BY A COURT.</li>
                                            <li>You and we must abide by the following rules: (1) ANY CLAIMS BROUGHT BY YOU OR US MUST BE BROUGHT IN THE PARTIES’ INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR
                                                CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING; (2) THE ARBITRATOR
                                                MAY NOT CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS, MAY NOT OTHERWISE PRESIDE OVER ANY
                                                FORM OF A REPRESENTATIVE OR CLASS PROCEEDING, AND MAY NOT AWARD CLASS-WIDE RELIEF, (3) in
                                                the event that you are able to demonstrate that the costs of arbitration will be prohibitive as compared
                                                to costs of litigation, we will pay as much of your filing and hearing fees in connection with the
                                                arbitration as the arbitrator deems necessary to prevent the arbitration from being cost-prohibitive as
                                                compared to the cost of litigation, (4) we also reserve the right in our sole and exclusive discretion to
                                                assume responsibility for all of the costs of the arbitration; (5) the arbitrator shall honor claims of
                                                privilege and privacy recognized at law; (6) the arbitrator’s award shall be final and may be enforced in
                                                any court of competent jurisdiction; (7) the arbitrator may award any individual relief or individual
                                                remedies that are permitted by applicable law; and (8) each side pays its own attorneys’ fees and
                                                expenses unless there is a statutory provision that requires the prevailing party to be paid its fees’ and
                                                litigation expenses, and then in such instance, the fees and costs awarded shall be determined by the
                                                applicable law.</li>
                                                <li>Notwithstanding the foregoing, either you or we may bring an individual action
                                                in small claims court. Further, claims of infringement or misappropriation of the other party’s patent,
                                                copyright, trademark, or trade secret shall not be subject to this arbitration agreement. Such claims shall be exclusively brought in the state or federal courts located in Houston, Texas. Additionally, notwithstanding this agreement to arbitrate, either party may seek emergency equitable relief before the state or federal courts located in Houston, Texas in order to maintain the status quo pending arbitration, and hereby agree to submit to the exclusive personal jurisdiction of the courts located within Houston, Texas for such purpose. A request for interim measures shall not be deemed a waiver of the right to arbitrate.</li>
                                                <li>With the exception of subparts (1) and (2) in Section 11.2(d) above (prohibiting
                                                arbitration on a class or collective basis), if any part of this arbitration provision is deemed to be invalid,
                                                unenforceable or illegal, or otherwise conflicts with the Agreement, then the balance of this arbitration
                                                provision shall remain in effect and shall be construed in accordance with its terms as if the invalid,
                                                unenforceable, illegal or conflicting provision were not contained herein. If, however, either subparts (1)
                                                and (2) in Section 11.2(d) (prohibiting arbitration on a class or collective basis) is found to be invalid,
                                                unenforceable or illegal, then the entirety of this arbitration provision shall be null and void, and neither
                                                you nor we shall be entitled to arbitration. If for any reason a claim proceeds in court rather than in
                                                arbitration, the dispute shall be exclusively brought in state or federal court in Houston, Texas.</li>
                                                <li>Notwithstanding any provision in these Terms to the contrary, if we seek to
                                                terminate the Dispute Resolution section as included in these Terms, any such termination shall not be
                                                effective until 30 days after the version of these Terms not containing the agreement to arbitrate is
                                                posted to the Site, and shall not be effective as to any claim of which you provided Company with
                                                written notice prior to the date of termination.</li>
                                                <li>For more information on AAA, its Rules and Procedures, and how to file an arbitration claim, you may call AAA at 800-778-7879 or visit the AAA website at http://www.adr.org. For  more information on JAMS, it’s Rules and Procedures, and how to file an arbitration claim, you may call JAMS at 800-352-5267 or visit the JAMS website at http://www.jamsadr.com.</li>
                                                <li>Any and all controversies, disputes, demands, counts, claims, or causes of action
                                                between you and Company and our employees, agents, successors, or assigns, regarding or relating to
                                                these Terms or the Site shall exclusively be governed by the internal laws of the State of Texas, without
                                                regard to its choice of law rules and without regard to conflicts of laws principles except that the
                                                arbitration provision shall be governed by the Federal Arbitration Act. The United Nations Convention
                                                on Contracts for the International Sale of Goods shall not apply to these Terms.</li>
                                                <p> <b>11.3 International Users.</b> The Site is controlled and offered by Company from its facilities in the United States of America. Company makes no representations that the Site appropriate or available
                                                for use in other locations. Those who access or use the Site from other countries do so at their own
                                                volition and are responsible for compliance with local law.</p>
                                                <p> <b>11.4 Export. </b>The Site may be subject to U.S. export control laws and may be subject to export or import regulations in other countries. You agree not to export, reexport, or transfer, directly or indirectly, any U.S. technical data acquired from Company, or any products utilizing such data, in violation of the United States export laws or regulations.</p>
                                                <p> <b>11.5 Customer Complaints.</b> Company is located at the address in Section 11.10. If you are a California resident, you may report complaints to the Complaint Assistance Unit of the Division of Consumer Product of the California Department of Consumer Affairs by contacting them in writing at
                                                400 R Street, Sacramento, CA 95814, or by telephone at (800) 952-5210.</p>
                                                <p> <b>11.6 Electronic Communications.</b> The communications between you and Company use
                                                electronic means, whether you use the Site or send us emails, or whether Company posts notices on the Site or communicates with you via email. For contractual purposes, you (a) consent to receive communications from Company in an electronic form; and (b) agree that all terms and conditions, agreements, notices, disclosures, and other communications that Company provides to you electronically satisfy any legal requirement that such communications would satisfy if it were be in a hardcopy writing. The foregoing does not affect your non-waivable rights.</p>
                                                <p> <b>11.7 Monitoring and Enforcement.</b> You acknowledge that Company has no obligation to
                                                pre-screen User Content, although Company reserves the right to: (a) monitor and review the Site and pre-screen, remove or refuse to post any of your User Content for any or no reason in our sole discretion; (b) take any action with respect to any of your User Content that we deem necessary or appropriate in our sole discretion, including if we believe that such User Content violates these Terms,
                                                infringes any intellectual property right or other right of any person or entity, threatens the personal safety of users of the Site or the public, or could create liability for the Company; (c) disclose your identity or other information about you to any third party who claims that material posted by you violates their rights, including their intellectual property rights or their right to privacy; (d) take appropriate legal action, including without limitation, referral to law enforcement, for any illegal or unauthorized use of the Site; and/or (e) terminate or suspend your access to all or part of the Site all for any or no reason, including without limitation, any violation of these Terms. By entering into these
                                                Terms, you hereby provide your irrevocable consent to such monitoring and enforcement.</p>
                                            <p> <b> 11.8 Entire Terms.</b> These Terms (including, for greater certainty, the Privacy Policy and other Supplemental Terms) constitute the entire agreement between you and us regarding the use of the Site. Our failure to exercise or enforce any right or provision of these Terms shall not operate as a waiver of such right or provision. The section titles in these Terms are for convenience only and have no legal or contractual effect. The word “including” means “including without limitation”. If any provision of these
                                                Terms is, for any reason, held to be invalid or unenforceable, the other provisions of these Terms will be unimpaired and the invalid or unenforceable provision will be deemed modified so that it is valid and enforceable to the maximum extent permitted by law. Your relationship to Company is that of an
                                                independent contractor, and neither party is an agent or partner of the other. These Terms, and your rights and obligations herein, may not be assigned, subcontracted, delegated, or otherwise transferred by you without Company’s prior written consent, and any attempted assignment, subcontract, delegation, or transfer in violation of the foregoing will be null and void. Company may freely assign these Terms. The terms and conditions set forth in these Terms shall be binding upon assignees.</p>
                                                <p> <b>11.9 Copyright/Trademark Information.</b> Copyright © 2022, Tavus Inc. All rights reserved. All  trademarks, logos and service marks (“Marks”) displayed on the Site are our property or the property of  other third parties. You are not permitted to use these Marks without our prior written consent or the consent of such third party which may own the Marks.</p>
                                                <p> <b>11.10 Contact Information:</b></p>
                                                <p>Tavus Inc<br/>
                                                Address: 2101 CityWest Blvd, 1 st Floor, Houston Texas 77042<br/>
                                                Fax:<br/>
                                                Email: support@tavus.io</p>
                                        </ul>
                                </div>
                            }
                        </div>

                        <div className="privacy-box-footer">
                                <div className="agree-button d-flex justify-content-end">
                                    <LoadingButtons
                                        onClick={Privacy}
                                        className={props.className}
                                        title={"I agree"}
                                    />
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;

