const categoryRoutes = require('./categoryRoutes');
const subCategoryRoutes = require('./subCategoryRoutes');
const brandRoutes = require('./brandRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const reviewRoutes = require('./reviewRoutes');
const wishlistRoutes = require('./wishlistRoutes');
const addressRoutes = require('./addressRoutes');
const couponRoutes = require('./couponRoutes');
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');


const Routes = (app) => {
    app.use('/api/categories', categoryRoutes);
    app.use('/api/subcategories', subCategoryRoutes);
    app.use('/api/brands', brandRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/reviews', reviewRoutes);
    app.use('/api/wishlist', wishlistRoutes);
    app.use('/api/addresses', addressRoutes);
    app.use('/api/coupons', couponRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/orders', orderRoutes);
}

module.exports = Routes;