export default (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => {
			if (process.env.NODE_ENV === "development") console.log(err);
			return next(err);
		});
	};
};
