import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, RefreshCw, User, Scissors } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Analysis {
  faceShape: string;
  hairStyleSuggestions: string[];
  beardSuggestions: string[];
  confidence: number;
}

const FaceAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const faceShapeData = {
    oval: {
      hair: ["Layered Cut", "Side Swept Bang", "Long Wavy", "Medium Length Bob"],
      beard: ["Full Beard", "Goatee", "Circle Beard", "Soul Patch"]
    },
    round: {
      hair: ["Angular Bob", "Layered Pixie", "Side Part", "Long Straight"],
      beard: ["Van Dyke", "Extended Goatee", "Chin Strap", "Full Beard"]
    },
    square: {
      hair: ["Soft Waves", "Side Bang", "Layered Long", "Textured Bob"],
      beard: ["Circle Beard", "Rounded Goatee", "Soul Patch", "Light Stubble"]
    },
    heart: {
      hair: ["Chin Length Bob", "Side Swept", "Wispy Fringe", "Long Layers"],
      beard: ["Full Beard", "Horseshoe", "Mutton Chops", "Extended Goatee"]
    },
    diamond: {
      hair: ["Full Fringe", "Chin Length", "Textured Waves", "Side Part"],
      beard: ["Full Beard", "Circle Beard", "Goatee", "Anchor Beard"]
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please try uploading an image instead.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");
    setImageUrl(imageData);
    stopCamera();
    analyzeImage(imageData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setImageUrl(imageData);
      analyzeImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = useCallback(async (imageData: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay and random results
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on random face shape detection
    const faceShapes = Object.keys(faceShapeData);
    const detectedShape = faceShapes[Math.floor(Math.random() * faceShapes.length)] as keyof typeof faceShapeData;
    const shapeData = faceShapeData[detectedShape];
    
    const mockAnalysis: Analysis = {
      faceShape: detectedShape.charAt(0).toUpperCase() + detectedShape.slice(1),
      hairStyleSuggestions: shapeData.hair,
      beardSuggestions: shapeData.beard,
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete!",
      description: `We've detected a ${mockAnalysis.faceShape.toLowerCase()} face shape with ${mockAnalysis.confidence}% confidence.`,
    });
  }, [toast]);

  const resetAnalysis = () => {
    setAnalysis(null);
    setImageUrl(null);
    stopCamera();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI Style Suggestions
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Upload your photo or use our camera to get personalized hairstyle and beard recommendations 
          based on your unique face shape.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Photo Capture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Capture Your Photo</span>
              </CardTitle>
              <CardDescription>
                Take a clear photo or upload an existing one for the best results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Preview */}
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Captured"
                    className="w-full h-full object-cover"
                  />
                ) : isCameraOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <User className="h-16 w-16 mx-auto mb-4" />
                      <p>No image captured yet</p>
                    </div>
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Controls */}
              <div className="space-y-3">
                {!isCameraOn && !imageUrl && (
                  <>
                    <Button onClick={startCamera} className="w-full" size="lg">
                      <Camera className="h-4 w-4 mr-2" />
                      Start Camera
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                      size="lg"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </>
                )}

                {isCameraOn && (
                  <>
                    <Button onClick={capturePhoto} className="w-full" size="lg">
                      <Camera className="h-4 w-4 mr-2" />
                      Capture Photo
                    </Button>
                    <Button variant="outline" onClick={stopCamera} className="w-full">
                      Cancel
                    </Button>
                  </>
                )}

                {imageUrl && !isAnalyzing && (
                  <Button onClick={resetAnalysis} variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scissors className="h-5 w-5" />
                <span>Style Recommendations</span>
              </CardTitle>
              <CardDescription>
                Personalized suggestions based on your face shape analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-muted-foreground">Analyzing your face shape...</p>
                </div>
              ) : analysis ? (
                <div className="space-y-6">
                  {/* Face Shape */}
                  <div>
                    <h3 className="font-semibold mb-2">Detected Face Shape</h3>
                    <Badge variant="secondary" className="text-sm">
                      {analysis.faceShape} ({analysis.confidence}% confidence)
                    </Badge>
                  </div>

                  {/* Hair Suggestions */}
                  <div>
                    <h3 className="font-semibold mb-3">Recommended Hairstyles</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {analysis.hairStyleSuggestions.map((style, index) => (
                        <Badge key={index} variant="outline" className="justify-center p-2">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Beard Suggestions */}
                  <div>
                    <h3 className="font-semibold mb-3">Recommended Beard Styles</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {analysis.beardSuggestions.map((style, index) => (
                        <Badge key={index} variant="outline" className="justify-center p-2">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-border">
                    <Button asChild className="w-full">
                      <a href="/booking">Book Appointment for These Styles</a>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Scissors className="h-8 w-8 mx-auto mb-4" />
                  <p>Upload or capture a photo to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How Our AI Analysis Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold mb-2">1. Capture Photo</h4>
                <p className="text-sm text-muted-foreground">
                  Take or upload a clear, front-facing photo
                </p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold mb-2">2. AI Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your facial features and shape
                </p>
              </div>
              <div className="text-center">
                <Scissors className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold mb-2">3. Get Suggestions</h4>
                <p className="text-sm text-muted-foreground">
                  Receive personalized hairstyle recommendations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FaceAnalysis;