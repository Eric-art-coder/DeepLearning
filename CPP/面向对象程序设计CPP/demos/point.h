class Point {
    private: 
        int x;
        int y;
    public:
        void init(int x, int y);
        void print() const;
        void move(int dx, int dy);
};