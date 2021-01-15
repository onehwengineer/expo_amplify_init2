import React, {useState} from 'react';
import { 
    StyleSheet, Text, View,
    Animated, Dimensions, Image, FlatList, Modal, ScrollView, 
    TouchableOpacity } from 'react-native';

import {FormStyles, colors, sizes} from '../styles/Styles'; 


const { width, height } = Dimensions.get('window');
const defaultProps = {
    illustrations: [
      { id: 1, source: require('../../assets/images/illustration_1.png') },
      { id: 2, source: require('../../assets/images/illustration_2.png') },
      { id: 3, source: require('../../assets/images/illustration_3.png') },
    ],
  };


export default function WelcomeScreen( {navigation} ) {

    const [showTerms, setShowTerms] = useState(false);

    var scrollX = new Animated.Value(0);
    var state = {
        showTerms: false,
    }

    const renderIllustrations = () => {
        const { illustrations } = defaultProps;
        return (
            <FlatList
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={illustrations}
                extraDate={state}
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({ item }) => (
                    <Image
                        source={item.source}
                        resizeMode="contain"
                        style={{ width, height: height / 2, overflow: 'visible' }}
                    />
                )}
                onScroll={
                    Animated.event(
                        [{nativeEvent: { contentOffset: { x: scrollX } }}],
                        {useNativeDriver: false}
                    )
                }
            />
        )        
    };

    const renderSteps = () => {
        const { illustrations } = defaultProps;
        const stepPosition = Animated.divide(scrollX, width);
        return (
            <View style={styles.stepsContainer}>
                {illustrations.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                    //const opacity = scrollX.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View 
                            key={index}
                            style={[styles.steps, { opacity }]}
                            //flex={false}
                            //key={`step-${index}`}
                            color="red"
                        />
                    )
                })}
            </View>
        )
    };

    const renderTermsService = () => {
        return(
            <Modal animationType="slide" visible={showTerms}>
                <View style={styles.containerToS}>
                    <Text style={{fontSize: sizes.h2, fontWeight: "200"}}>Terms of Service</Text>

                    <ScrollView style={{ marginVertical: sizes.padding}}>
                        <Text style={styles.txtToS}>
                        1. Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis.  
                        </Text>
                        <Text style={styles.txtToS}>
                        2. Support for Expo services is only available in English, via e-mail.
                        </Text>
                        <Text style={styles.txtToS}>
                        3. You understand that Expo uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service.
                        </Text>
                        <Text style={styles.txtToS}>
                        4. You must not modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service, Expo, or any other Expo service. 
                        </Text>
                        <Text style={styles.txtToS}>
                        5. You may use the Expo Pages static hosting service solely as permitted and intended to host your organization pages, personal pages, or project pages, and for no other purpose. You may not use Expo Pages in violation of Expo's trademark or other rights or in violation of applicable law. Expo reserves the right at all times to reclaim any Expo subdomain without liability to you.
                        </Text>
                        <Text style={styles.txtToS}>
                        6. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without the express written permission by Expo.
                        </Text>
                        <Text style={styles.txtToS}>
                        7. We may, but have no obligation to, remove Content and Accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.
                        </Text>
                        <Text style={styles.txtToS}>
                        8. Verbal, physical, written or other abuse (including threats of abuse or retribution) of any Expo customer, employee, member, or officer will result in immediate account termination.
                        </Text>
                        <Text style={styles.txtToS}>
                        9. You understand that the technical processing and transmission of the Service, including your Content, may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
                        </Text>
                        <Text style={styles.txtToS}>
                        10. You must not upload, post, host, or transmit unsolicited e-mail, SMSs, or "spam" messages.
                        </Text>
                    </ScrollView>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: sizes.base / 2}}>
                        <TouchableOpacity style={[FormStyles.btn, {width: '80%'}]} onPress={() => setShowTerms(false)}>
                            <Text style={FormStyles.btnText}>I understand </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    };

    return (
        <View style={styles.container}> 
            <View style={styles.container1}>
                <Text style={{fontSize: sizes.h1, textAlign: "center", fontWeight: "bold"}}>
                    Your Home.
                    <Text style={{fontSize: sizes.h1, color: colors.primary}}> Greener. </Text>
                </Text>
                <Text style={{fontSize: sizes.h3, color: colors.gray2, marginTop: sizes.padding / 2}}>
                    Enjoy the experience.
                </Text>
            </View>

            <View style={styles.container2}>
                {renderIllustrations()} 
                {renderSteps()}
            </View>
            
            <View style={styles.container3}>
                <TouchableOpacity 
                    style={[FormStyles.btn, {width: '80%', marginVertical: sizes.padding / 3}]} 
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={FormStyles.btnText}>Sign In </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[FormStyles.btn, FormStyles.btnShadow, {width: '80%', marginVertical: sizes.padding / 3}]}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={[FormStyles.btnText, {color: colors.black}]}>Sign Up </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowTerms(true)}>
                    <Text style={styles.txtTerms}>Terms of Service </Text>
                </TouchableOpacity>
            </View>
            {renderTermsService()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    container1: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container3: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        //backgroundColor: "#123456" // debug
    },
    containerToS: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: sizes.padding*2, 
        paddingHorizontal: sizes.padding,
    },

    stepsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        position: 'absolute',
        bottom: 16 * 3,
        right: 0,
        left: 0,
    },
    steps: {
        backgroundColor: "gray",
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
    },

    txtTerms: {
        marginTop: sizes.padding,
        fontSize: sizes.caption,
        textAlign: "center",
        color: colors.gray      
    },
    txtToS: {
        fontSize: sizes.caption, 
        color: colors.gray, 
        lineHeight: 24, 
        marginBottom: 16,
    },
});
