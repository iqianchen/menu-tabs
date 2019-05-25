<template>
	<div>
		<is-loading v-if='isLoading'></is-loading>
		<loading-error v-if="isError"  @reload='load' :errorDetails='errorDetails'></loading-error>
		<component :is="nowComponent" v-if='!isLoading&&!isError' ref="componentChild"></component>
	</div>
</template>

<script>
import IsLoading from "./IsLoading";
import LoadingError from "./LoadingError";

export default {
	name: 'asyncComponent',
	components: {
		IsLoading,
		LoadingError
	},
	data() {
		return {
			nowComponent: null,
			isLoading: true,
			isError: false,
			errorDetails: ""
		}
	},
	props: {
		componentPath: String,
		delay: Number,
	},
	mounted() {
    this.load()
  },
	methods: {
		load() {
			import(`p/${this.componentPath}`)
				.then(() => {
					setTimeout(() => {
						this.nowComponent = () => import(`p/${this.componentPath}`)
						this.isLoading = false
						this.isError = false
					}, this.delay);
				})
				.catch(err => {
					this.nowComponent = LoadingError
					this.isError = true
					this.isLoading = false
					this.errorDetails = err.message
				});
		}
	}
}
</script>
