class Point3d{
    public:
        Point3d(float x, float y, float z);
        print();
    private:
        float x;
        float y;
        float z;
};

Point3d a(1,2,3);
a.print();