import React, { useState } from 'react'
import {
	View,
	ScrollView,
	Button,
	Platform,
	TouchableHighlight,
	Alert,
	Image,
	ImageSourcePropType,
} from 'react-native'
import { StyledText } from '../../components/Text'
import styled from 'styled-components/native'
import useForm from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Variables } from '../../utils/Variables'
import ImagePicker from 'react-native-image-picker'

const ErrMsg = styled(StyledText)`
	color: red;
	font-family: Oswald-Light;
	margin-bottom: 10px;
`

const FormField = styled(StyledText)`
	margin-top: 20px;
`

const StyledInput = styled.TextInput`
	font-family: Oswald-Light;
	border-bottom-width: 1px;
	border-bottom-color: #bbb;
	color: #000;
`

const ButtonsContainer = styled.View`
	flex-direction: row;
	justify-content: space-evenly;
	margin-vertical: 30px;
`

const FormHeader = styled(StyledText)`
	font-size: 18;
	font-family: 'Oswald-Bold';
	padding-vertical: 15px;
`

const PosterPreview = styled(Image)`
	width: 100%;
	height: 250px;
	marginvertical: 15px;
`

export const AddMovieForm: React.FC<{
	onSubmit: (data: any) => void
	setModalVisibility: (visibility: boolean) => void
}> = ({ onSubmit, setModalVisibility }) => {
	const { register, handleSubmit, errors, setValue } = useForm()
	const [pickerData, setPickerData] = useState({ show: false, date: new Date() })
	const [posterSource, setPosterSource]: [ImageSourcePropType, any] = useState({
		uri: undefined,
	})

	setValue('release_date', pickerData.date, true)

	const setDate = (_: any, date: Date = pickerData.date) => {
		setPickerData({
			show: Platform.OS === 'ios' ? true : false,
			date,
		})

		setValue('release_date', date, true)
	}

	const show = () => {
		setPickerData({
			show: true,
			date: pickerData.date,
		})
	}

	const options = {
		title: 'Select Poster',
		storageOptions: {
			skipBackup: true,
			path: 'images',
		},
	}
	const openImagePicker = () =>
		ImagePicker.launchImageLibrary(options, response => {
			if (response.didCancel) {
				console.log('User cancelled image picker')
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error)
				Alert.alert('Oh!!', 'Something went wrong, Please try again!')
			} else {
				const source = { uri: response.uri }

				setPosterSource(source)
				setValue('poster_path', source.uri, true)
			}
		})

	const d = pickerData.date

	return (
		<ScrollView style={{ marginHorizontal: 15 }}>
			<FormHeader>Add your Movie</FormHeader>

			<View>
				<FormField>Movie Title</FormField>
				<StyledInput
					ref={register({ name: 'title' }, { required: true })}
					onChangeText={text => setValue('title', text, true)}
				/>
				{errors.title && <ErrMsg>Movie Title is required</ErrMsg>}

				<FormField>Movie Overview</FormField>
				<StyledInput
					multiline
					numberOfLines={4}
					ref={register({ name: 'overview' }, { required: true })}
					onChangeText={text => setValue('overview', text, true)}
				/>
				{errors.overview && <ErrMsg>Movie Overview is required</ErrMsg>}

				<TouchableHighlight onPress={show} underlayColor="transparent">
					<>
						<FormField>Movie Release Date</FormField>
						<StyledInput
							ref={register({ name: 'release_date' }, { required: true })}
							value={`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`}
							editable={false}
						/>
						{errors.release_date && <ErrMsg>Movie Date is required</ErrMsg>}
					</>
				</TouchableHighlight>

				{pickerData.show && (
					<DateTimePicker
						value={pickerData.date}
						display="default"
						onChange={setDate}
					/>
				)}

				<FormField>Movie Poster</FormField>
				{posterSource.uri && <PosterPreview source={posterSource} />}
				<Button
					title="Choose Poster"
					onPress={openImagePicker}
					ref={register({ name: 'poster_path' }, { required: true })}
				/>
				{errors.poster_path && <ErrMsg>Poster is required</ErrMsg>}
			</View>

			<ButtonsContainer>
				<Button
					title="Add movie"
					color={Variables.colorPrimary}
					onPress={handleSubmit(onSubmit)}
				/>
				<Button
					color="gray"
					title="Cancel"
					onPress={() => {
						Alert.alert(
							'Your input will be lost!',
							'Are you sure you want to discard Movie data?',
							[
								{
									text: 'Yes',
									onPress: () => {
										setModalVisibility(false)
									},
								},
								{ text: 'No', onPress: () => {} },
							],
						)
					}}
				/>
			</ButtonsContainer>
		</ScrollView>
	)
}
